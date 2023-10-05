import { withAuth } from "next-auth/middleware"


export default withAuth(
    function middleware(req) {
        // authorization code can be put here,inside function
        if (req.nextauth?.token) { }
    }, {
    callbacks: {
        authorized: ({ token }) => !!token
    }
}
)



export const config = {
    matcher: [
        // whitelisted
        '/((?!api|_next/static|_next/image|favicon.ico|auth/*|/*).*)',
        // require authentication
        "/dash:path*"
    ],

}

