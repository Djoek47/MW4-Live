"""Generates MW4_Live.json — an OBS Studio scene collection.
Run:  python build_scenes.py  [repo_path]   (default C:/MW4-Live)
Import in OBS: Scene Collection > Import > pick MW4_Live.json > Finish, then select it.
"""
import json, sys, uuid

ROOT = (sys.argv[1] if len(sys.argv) > 1 else "C:/MW4-Live").replace("\\", "/").rstrip("/")
OV = f"{ROOT}/broadcast/overlays"
W, H = 1920, 1080
sources, order = [], []


def src(name, kind, settings, **extra):
    s = {"name": name, "id": kind, "versioned_id": kind, "uuid": str(uuid.uuid4()), "settings": settings,
         "enabled": True, "muted": False, "volume": 1.0, "mixers": 255, "sync": 0, "flags": 0,
         "filters": [], "hotkeys": {}, "deinterlace_mode": 0, "monitoring_type": 0, "private_settings": {}}
    s.update(extra)
    sources.append(s)
    return name


def browser(name, page, w=W, h=H, css=""):
    return src(name, "browser_source", {"is_local_file": False, "url": f"file:///{OV}/{page}", "width": w, "height": h,
                                         "fps": 30, "shutdown": False, "restart_when_active": True, "css": css})


def item(name, x=0, y=0, sx=1.0, sy=None, visible=True, crop=None):
    i = {"name": name, "source_uuid": next(s["uuid"] for s in sources if s["name"] == name), "visible": visible,
         "locked": False, "pos": {"x": x, "y": y}, "scale": {"x": sx, "y": sy if sy is not None else sx},
         "rot": 0.0, "align": 5, "bounds_type": 0, "bounds": {"x": 0, "y": 0}, "bounds_align": 0,
         "crop_left": 0, "crop_top": 0, "crop_right": 0, "crop_bottom": 0, "id": len(order) * 100 + 1, "group_item_backup": False}
    if crop: i.update(crop)
    return i


def scene(name, items):
    for n, it in enumerate(items): it["id"] = n + 1
    src(name, "scene", {"id_counter": len(items), "custom_size": False, "items": items})
    order.append({"name": name})


# ---------- shared inputs ----------
src("Elgato (Console)", "dshow_input", {"video_device_id": "", "audio_output_mode": 0, "res_type": 1, "resolution": "1920x1080", "fps_type": 0})
src("Host Cam", "dshow_input", {"video_device_id": "", "res_type": 0})
src("Host Mic", "wasapi_input_capture", {"device_id": "default"})
src("PC Game Capture", "game_capture", {"capture_mode": "any_fullscreen", "capture_cursor": False})
# Guest feed: paste your VDO.Ninja "view" link in the URL (see SETUP.md). Discord window capture also works.
src("Guest (VDO.Ninja)", "browser_source", {"is_local_file": False, "url": "https://vdo.ninja/?view=MW4GUEST1&cleanoutput&transparent", "width": 1280, "height": 720, "reroute_audio": True})
# 24/7 loop + reels: drop MP4s in these folders. VLC source shuffles and loops forever.
src("Replay Loop (VLC)", "vlc_source", {"playlist": [{"value": f"{ROOT}/media/loop", "hidden": False, "selected": False}], "loop": True, "shuffle": True, "playback_behavior": "always_play"})
src("Highlight Reels (VLC)", "vlc_source", {"playlist": [{"value": f"{ROOT}/media/reels", "hidden": False, "selected": False}], "loop": True, "shuffle": False, "playback_behavior": "always_play"})
src("Bed Music", "ffmpeg_source", {"local_file": f"{ROOT}/media/music/bed.mp3", "looping": True, "is_local_file": True}, volume=0.25)

browser("GFX · Frame LIVE", "frame.html")
browser("GFX · Frame REPLAY", "frame.html?mode=replay")
browser("GFX · Frame REEL", "frame.html?mode=reel")
browser("GFX · Lower Third Host", "lowerthird.html?who=host")
browser("GFX · Lower Third Guest", "lowerthird.html?who=guest")
browser("GFX · Interview", "interview.html")
browser("GFX · Scoreboard", "scoreboard.html")
browser("GFX · Starting Soon", "card.html?type=starting&min=5")
browser("GFX · BRB", "card.html?type=brb")
browser("GFX · Ending", "card.html?type=ending")
browser("GFX · Schedule", "card.html?type=schedule")

# ---------- scenes (top of list = default) ----------
scene("24/7 · REPLAY LOOP", [item("Replay Loop (VLC)"), item("GFX · Frame REPLAY")])
scene("24/7 · HIGHLIGHT REEL", [item("Highlight Reels (VLC)"), item("GFX · Frame REEL")])
scene("24/7 · SCHEDULE CARD", [item("Bed Music"), item("GFX · Schedule")])
scene("LIVE · STARTING SOON", [item("Bed Music"), item("GFX · Starting Soon")])
scene("LIVE · CONSOLE", [item("Elgato (Console)"), item("Host Cam", 1540, 600, 0.18), item("Host Mic"),
                        item("GFX · Frame LIVE"), item("GFX · Lower Third Host", visible=False)])
scene("LIVE · PC", [item("PC Game Capture"), item("Host Cam", 1540, 600, 0.18), item("Host Mic"),
                   item("GFX · Frame LIVE"), item("GFX · Lower Third Host", visible=False)])
scene("LIVE · DESK", [item("Host Cam"), item("Host Mic"), item("GFX · Frame LIVE"), item("GFX · Lower Third Host")])
# Interview boxes: A at (80,170), B at (980,170), each 860x484 — matches interview.html
scene("LIVE · INTERVIEW", [item("Host Cam", 80, 170, 860 / 1920), item("Guest (VDO.Ninja)", 980, 170, 860 / 1280),
                          item("Host Mic"), item("GFX · Interview")])
scene("LIVE · GUEST GAMEPLAY", [item("Guest (VDO.Ninja)", 0, 0, W / 1280), item("Host Mic"), item("GFX · Frame LIVE"),
                               item("GFX · Lower Third Guest")])
scene("LIVE · CHALLENGE", [item("Elgato (Console)"), item("Host Mic"), item("GFX · Frame LIVE"), item("GFX · Scoreboard")])
scene("LIVE · BRB", [item("Bed Music"), item("GFX · BRB")])
scene("LIVE · ENDING", [item("Bed Music"), item("GFX · Ending")])

collection = {"name": "MW4 Live", "current_scene": order[0]["name"], "current_program_scene": order[0]["name"],
              "current_transition": "Fade", "transition_duration": 400, "scene_order": order, "sources": sources,
              "groups": [], "quick_transitions": [], "transitions": [], "saved_projectors": [], "modules": {},
              "preview_locked": False, "scaling_enabled": False, "scaling_level": 0, "scaling_off_x": 0.0, "scaling_off_y": 0.0}
out = "MW4_Live.json"
json.dump(collection, open(out, "w"), indent=1)
print(f"wrote {out}: {len(order)} scenes, {len(sources) - len(order)} sources, root={ROOT}")
