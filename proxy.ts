import { NextResponse, type NextRequest } from "next/server";

// proposal.artdigging.com/<slug>  →  /proposals/<slug>
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (!host.startsWith("proposal.")) return NextResponse.next();

  const url = request.nextUrl.clone();
  const { pathname } = url;
  if (!pathname.startsWith("/proposals")) {
    url.pathname = pathname === "/" ? "/proposals" : `/proposals${pathname}`;
  }
  const res = NextResponse.rewrite(url);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  // Leave API routes, Next.js assets and public files alone.
  matcher: ["/((?!api|_next|images|icon.svg|favicon.ico|robots.txt).*)"],
};
