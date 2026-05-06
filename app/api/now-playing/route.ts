import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({
      isPlaying: false,
      error: "Spotify env bilgileri eksik.",
    });
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.json({
      isPlaying: false,
      error: "Access token alınamadı.",
    });
  }

  const nowRes = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      cache: "no-store",
    }
  );

  if (nowRes.status === 204) {
    return NextResponse.json({ isPlaying: false });
  }

  if (!nowRes.ok) {
    return NextResponse.json({ isPlaying: false });
  }

  const song = await nowRes.json();

  return NextResponse.json({
    isPlaying: song.is_playing,
    title: song.item?.name,
    artist: song.item?.artists?.map((a: any) => a.name).join(", "),
    albumImage: song.item?.album?.images?.[0]?.url,
    songUrl: song.item?.external_urls?.spotify,
    progressMs: song.progress_ms,
    durationMs: song.item?.duration_ms,
  });
}