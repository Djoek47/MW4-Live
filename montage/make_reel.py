"""MW4 LIVE — highlight reel builder (ffmpeg).

Drop clips in media/clips-inbox named   GAMERTAG__What happened.mp4
(double underscore; the part after it becomes the on-screen title. No __? the file name is the title).

  python montage/make_reel.py                         # 16:9 reel for the 24/7 loop  -> media/reels/
  python montage/make_reel.py --vertical              # also one 9:16 short per clip -> media/shorts/
  python montage/make_reel.py --max 20 --mute         # cap clips at 20 s, drop game audio (music risk)
  python montage/make_reel.py --title "CLUTCH SATURDAY"

Every clip gets: MW4 LIVE bug, a REEL tag, a numbered chyron crediting the player, loudness-normalised audio.
Only use clips sent in with permission (the website's submit form records it) or your own footage.
"""
import argparse, datetime, pathlib, shutil, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
FONT = (pathlib.Path(__file__).parent / "BarlowCondensed-800.ttf").as_posix()
FONT_L = (pathlib.Path(__file__).parent / "BarlowCondensed-600.ttf").as_posix()
RED, INK, PAPER, GOLD = "0xC4161C", "0x1D1410", "0xF6EAD0", "0xE8A317"
VIDEO_EXT = {".mp4", ".mov", ".mkv", ".webm", ".m4v"}


def ff(*args):
    cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *map(str, args)]
    r = subprocess.run(cmd)
    if r.returncode: sys.exit(f"ffmpeg failed: {' '.join(cmd[:12])}…")


def esc(t: str) -> str:  # drawtext-safe text
    return t.replace("\\", "\\\\").replace(":", r"\:").replace("'", "’").replace("%", r"\%").replace(",", r"\,")


def parse(p: pathlib.Path):
    stem = p.stem
    tag, title = stem.split("__", 1) if "__" in stem else ("", stem)
    return tag.strip().upper(), title.replace("_", " ").strip().upper()


def text(t, x, y, size, color=PAPER, font=FONT, extra=""):
    return f"drawtext=fontfile='{font}':text='{esc(t)}':x={x}:y={y}:fontsize={size}:fontcolor={color}{extra}"


def gfx_169(n, tag, title, dur):
    """Bug top-left, REEL tag, bottom chyron that slides in after 0.4 s and out 0.6 s before the end."""
    show = f":enable='between(t,0.4,{max(dur - 0.6, 0.5):.2f})'"
    credit = f"CLIP BY {tag}" if tag else "COMMUNITY CLIP"
    return ",".join([
        f"drawbox=x=40:y=36:w=96:h=44:color={RED}:t=fill", text("MW4", 52, 42, 38, "white"), text("LIVE", 146, 42, 38),
        f"drawbox=x=232:y=40:w=96:h=36:color={GOLD}:t=fill", text("REEL", 250, 43, 30, INK),
        f"drawbox=x=80:y=880:w=90:h=120:color={RED}:t=fill{show}", text(f"{n}", "125-tw/2", 892, 96, "white", extra=show),
        f"drawbox=x=170:y=880:w=1300:h=70:color={PAPER}:t=fill{show}", text(title[:52], 190, 888, 56, INK, extra=show),
        f"drawbox=x=170:y=950:w=1300:h=50:color={INK}:t=fill{show}", text(credit, 190, 956, 36, PAPER, FONT_L, extra=show),
    ])


def gfx_916(tag, title):
    credit = f"@{tag}" if tag else "COMMUNITY CLIP"
    return ",".join([
        f"drawbox=x=60:y=180:w=110:h=50:color={RED}:t=fill", text("MW4", 74, 186, 44, "white"), text("LIVE", 182, 186, 44),
        f"drawbox=x=60:y=1420:w=960:h=90:color={PAPER}:t=fill", text(title[:30], 84, 1430, 70, INK),
        f"drawbox=x=60:y=1510:w=960:h=64:color={INK}:t=fill", text(credit, 84, 1518, 46, PAPER, FONT_L),
        text("FULL SHOW · TWITCH.TV/MW4LIVETV", "(w-tw)/2", 1700, 40, GOLD, FONT_L),
    ])


def card(path, top, big, sub, secs=3):
    """Title / end card: dark grid frame with a red bar, rendered by ffmpeg alone."""
    vf = ",".join([
        # symmetrical poster card: red field, ink bands top and bottom, centred stack
        f"drawbox=x=0:y=0:w=iw:h=90:color={INK}:t=fill", f"drawbox=x=0:y=ih-90:w=iw:h=90:color={INK}:t=fill",
        f"drawbox=x=0:y=90:w=iw:h=8:color={GOLD}:t=fill", f"drawbox=x=0:y=ih-98:w=iw:h=8:color={GOLD}:t=fill",
        text("MW4 LIVE · THE PEOPLE'S BROADCAST", "(w-tw)/2", 24, 44, GOLD),
        text(top, "(w-tw)/2", 330, 44, GOLD, FONT_L), text(big, "(w-tw)/2+8", 408, 210, "0x7D0C10"), text(big, "(w-tw)/2", 400, 210, PAPER),
        text(sub, "(w-tw)/2", 680, 44, PAPER, FONT_L), text("FAN-RUN PARODY · NOT AFFILIATED WITH ACTIVISION", "(w-tw)/2", 1014, 30, "0xB8A37F", FONT_L),
        f"fade=t=in:st=0:d=0.4,fade=t=out:st={secs - 0.4}:d=0.4",
    ])
    ff("-f", "lavfi", "-i", f"color=c={RED}:s=1920x1080:r=60:d={secs}", "-f", "lavfi", "-i", f"anullsrc=r=48000:cl=stereo",
       "-t", secs, "-vf", vf, *ENC, path)


ENC = ["-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "60",
       "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-ac", "2", "-movflags", "+faststart"]


def duration(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)], capture_output=True, text=True)
    return float(r.stdout.strip() or 0)


def has_audio(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", str(p)], capture_output=True, text=True)
    return bool(r.stdout.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inbox", default=ROOT / "media/clips-inbox")
    ap.add_argument("--out", default=ROOT / "media/reels")
    ap.add_argument("--max", type=float, default=30, help="max seconds per clip")
    ap.add_argument("--title", default="HIGHLIGHT REEL")
    ap.add_argument("--mute", action="store_true", help="replace game audio with silence (use if clips carry music)")
    ap.add_argument("--vertical", action="store_true", help="also export a 9:16 short per clip")
    ap.add_argument("--move", action="store_true", help="move used clips to media/clips-used afterwards")
    a = ap.parse_args()
    if not shutil.which("ffmpeg"): sys.exit("ffmpeg not found — install it and add to PATH")
    clips = sorted(p for p in pathlib.Path(a.inbox).iterdir() if p.suffix.lower() in VIDEO_EXT)
    if not clips: sys.exit(f"No clips in {a.inbox}")
    out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)
    stamp = datetime.datetime.now().strftime("%Y-%m-%d_%H%M")
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="mw4reel_"))
    parts = [tmp / "00_intro.mp4"]
    card(parts[0], datetime.date.today().strftime("%A %B %d").upper(), a.title, f"{len(clips)} PLAYS FROM THE COMMUNITY")

    for n, clip in enumerate(clips, 1):
        tag, title = parse(clip)
        dur = min(duration(clip), a.max)
        print(f"[{n}/{len(clips)}] {clip.name}  ({dur:.0f}s)")
        fit = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x0B0D0F,setsar=1,fps=60"
        fades = f"fade=t=in:st=0:d=0.25,fade=t=out:st={dur - 0.3:.2f}:d=0.3"
        audio_in = ["-f", "lavfi", "-t", dur, "-i", "anullsrc=r=48000:cl=stereo"] if (a.mute or not has_audio(clip)) else []
        amap = ["-map", "0:v", "-map", "1:a"] if audio_in else ["-map", "0:v", "-map", "0:a", "-af", f"loudnorm=I=-16:TP=-1.5,afade=t=out:st={dur - 0.3:.2f}:d=0.3"]
        seg = tmp / f"{n:02d}.mp4"
        ff("-t", dur, "-i", clip, *audio_in, "-vf", f"{fit},{gfx_169(n, tag, title, dur)},{fades}", *amap, "-t", dur, *ENC, seg)
        parts.append(seg)
        if a.vertical:
            sh = ROOT / "media/shorts"; sh.mkdir(parents=True, exist_ok=True)
            vf = ("[0:v]split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=30:5,eq=brightness=-0.25[bg];"
                  "[b]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2," + gfx_916(tag, title) + "[v]")
            amap_v = ["-map", "[v]", "-map", "1:a"] if audio_in else ["-map", "[v]", "-map", "0:a", "-af", "loudnorm=I=-14:TP=-1.5"]
            ff("-t", dur, "-i", clip, *audio_in, "-filter_complex", vf, *amap_v, "-t", dur, *[e if e != "60" else "30" for e in ENC],
               sh / f"{stamp}_{n:02d}_{(tag or 'clip').lower()}.mp4")

    end = tmp / "99_end.mp4"; card(end, "THE MINISTRY THANKS YOU", "SEND YOURS", "MW4LIVE.COM/SUBMIT · LIVE DAILY 09 · 12 · 15 · 18 · 21 ET"); parts.append(end)
    lst = tmp / "list.txt"; lst.write_text("".join(f"file '{p.as_posix()}'\n" for p in parts))
    final = out / f"reel_{stamp}.mp4"
    ff("-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", final)
    shutil.rmtree(tmp, ignore_errors=True)
    if a.move:
        used = ROOT / "media/clips-used"; used.mkdir(exist_ok=True)
        for c in clips: shutil.move(str(c), used / c.name)
    print(f"\nDone: {final}  ({duration(final):.0f}s)")


if __name__ == "__main__":
    main()
