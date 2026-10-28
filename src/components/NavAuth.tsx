"use client";
import Link from "next/link";
import { useUser } from "@/lib/data";

export function NavAuth() {
  const { user, profile, loading, demo } = useUser();
  if (loading) return <span className="w-20" />;
  if (!user || demo) return demo ? null : <Link href="/login" className="btn btn-line !py-2 !px-4 !text-sm">Sign in</Link>;
  return <Link href={profile?.is_admin ? "/admin" : "/clips"} className="btn btn-line !py-2 !px-4 !text-sm">{profile?.display_name ?? "Account"}</Link>;
}
