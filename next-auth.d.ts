import NextAuth from "next-auth/next";
declare module "next-auth/client"
declare module "next-auth" {
    interface Session {
        user: {
            accessToken: string,
            refreshToken: string,
            iat: string,
            exp: string

        }
    }
}