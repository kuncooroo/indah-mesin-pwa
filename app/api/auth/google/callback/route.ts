import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { exchangeGoogleCode, getAppOrigin } from "@/lib/auth/google";
import { AuthError, authService } from "@/lib/services/auth.service";

const OAUTH_STATE_COOKIE = "google_oauth_state";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const cookieStore = await cookies();
  const savedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value;
  cookieStore.delete(OAUTH_STATE_COOKIE);

  if (error) {
    return NextResponse.redirect(new URL("/akun/login?error=google_denied", request.url));
  }

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(new URL("/akun/login?error=google_invalid", request.url));
  }

  try {
    const redirectUri = `${getAppOrigin(request)}/api/auth/google/callback`;
    const profile = await exchangeGoogleCode(code, redirectUri);

    if (!profile.email) {
      throw new AuthError("Email Google tidak tersedia");
    }

    await authService.loginOrRegisterWithGoogle({
      googleId: profile.sub,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
    });

    return NextResponse.redirect(new URL("/akun", request.url));
  } catch (authError) {
    const message =
      authError instanceof AuthError ? authError.message : "google_failed";
    return NextResponse.redirect(
      new URL(`/akun/login?error=${encodeURIComponent(message)}`, request.url),
    );
  }
}
