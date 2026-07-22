import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

import { getAppOrigin, getGoogleAuthUrl } from "@/lib/auth/google";

const OAUTH_STATE_COOKIE = "google_oauth_state";

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/akun/login?error=google_not_configured", request.url),
    );
  }

  const state = randomBytes(16).toString("hex");
  const redirectUri = `${getAppOrigin(request)}/api/auth/google/callback`;
  const authUrl = getGoogleAuthUrl(redirectUri, state);

  const cookieStore = await cookies();
  cookieStore.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return NextResponse.redirect(authUrl);
}
