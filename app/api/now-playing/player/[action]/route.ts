import { NextResponse } from "next/server";

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify env bilgileri eksik.");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
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

  const data = await res.json();
  return data.access_token;
}

export async function POST(
  req: Request,
  { params }: { params: { action: string } }
) {
  try {
    const accessToken = await getAccessToken();
    const action = params.action;

    let url = "";
    let method = "POST";

    if (action === "next") {
      url = "https://api.spotify.com/v1/me/player/next";
    }

    if (action === "previous") {
      url = "https://api.spotify.com/v1/me/player/previous";
    }

    if (action === "pause") {
      url = "https://api.spotify.com/v1/me/player/pause";
      method = "PUT";
    }

    if (action === "play") {
      url = "https://api.spotify.com/v1/me/player/play";
      method = "PUT";
    }

    if (!url) {
      return NextResponse.json({ error: "Geçersiz işlem." }, { status: 400 });
    }

    const spotifyRes = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({
      ok: spotifyRes.ok,
      status: spotifyRes.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}