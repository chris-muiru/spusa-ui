import { axiosPublic } from "@/utils/conf/axiosInstance";
import { SERVER_LOCALHOST } from "@/utils/conf/properties";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider(
            {
                type: "credentials",
                authorize: async (credentials, req) => {

                    const { username, password } = credentials as { username: string, password: string }
                    try {
                        const res = await fetch(`${SERVER_LOCALHOST}/api/v1/auth/token/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(
                                {
                                    username,
                                    password
                                }

                            )
                        });


                        const user = await res.json()
                        return user.accessToken ? user : null

                    }
                    catch (e: unknown) {
                        console.log(e)
                        throw e;

                    }
                },
                credentials: {},
            }
        )
    ],
    session: {
        strategy: "jwt"
    },

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as any
            return session
        }
    },
    // use custom login form
    pages: {
        signIn: "/auth/login",
        error: "/404",
        signOut: "/auth/signOut"
    }

}

async function refreshRotation(exp: number, refreshToken: string) {
    let response = await axiosPublic.post("/auth/refresh", { refreshToken })
    return await response.data

}
export default NextAuth(authOptions)