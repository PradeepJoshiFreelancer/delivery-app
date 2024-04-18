import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";

export const config = {
  matcher: ["/admin/:path*", "/node/:path*", "/parcel/:path*", "/admin/:path*"],
};
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (session) {
    return NextResponse.next();
  } else {
    const signInPage = "/signin";
    const signInUrl = new URL(signInPage, req.nextUrl.origin);
    signInUrl.searchParams.append("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }
}
