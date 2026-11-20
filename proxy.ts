import { NextResponse, type NextRequest } from "next/server";

// Page URLs are lower case, so /About or /ADMISSIONS used to return 404. Redirect any page path with
// capital letters to its lower-case form, keeping the query string. Assets, Next.js internals, API
// routes and /.well-known are excluded by the matcher, so their exact names are never touched.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (lower === pathname) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Everything except /_next/*, /api/*, /.well-known/* and paths ending in a file extension
  matcher: ["/((?!_next/|api/|\\.well-known/)(?!.*\\.[A-Za-z0-9]+$).*)"],
};
