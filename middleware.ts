import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// export { default } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token:jftvhbj ", req.nextauth.token);

    if (req.nextUrl.pathname.startsWith("/recruiter") && req.nextauth.token?.role !== "recruiter")
      return  NextResponse.redirect(
        new URL("/?error_message=You Are Not Authorized!", req.url)
      );
    if (req.nextUrl.pathname.startsWith("/candidate") && req.nextauth.token?.role !== "candidate")
      return NextResponse.redirect(
        new URL("/?error_message=You Are Not Authorized!", req.url)
      );
      if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin")
        return NextResponse.redirect(
          new URL("/?error_message=You Are Not Authorized!", req.url)
        );
      if (req.nextUrl.pathname.startsWith("/moderator") && req.nextauth.token?.role !== "moderator")
        return NextResponse.redirect(
          new URL("/?error_message=You Are Not Authorized!", req.url)
        );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [ "/moderator/:path*","/admin/:path*","/recruiter/:path*","/candidate/:path*"],
};