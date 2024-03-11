import { NextRequest, NextResponse } from "next/server";

import { REFRESH_TOKEN_KEY } from "./lib/axios";
import RoutePath, { authRoutes, privatRoutes } from "./routes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(REFRESH_TOKEN_KEY);
  if (privatRoutes.includes(request.nextUrl.pathname as RoutePath)) {
    if (token == null)
      return NextResponse.redirect(
        new URL(process.env.BASE_URL + RoutePath.Signin, request.url)
      );
  }
  // !auth
  if (authRoutes.includes(request.nextUrl.pathname as RoutePath)) {
    if (token != null)
      return NextResponse.redirect(new URL(process.env.BASE_URL, request.url));
  }
}
