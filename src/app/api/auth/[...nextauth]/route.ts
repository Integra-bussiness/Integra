import { getUser } from "@/utils/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const handler = NextAuth({
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Login / Password",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.login || !credentials?.password) {
                    return null;
                }
                const user = await getUser(credentials.login);
                if (!user) {
                    return null;
                }

                if (credentials.password !== user.password) {
                    return null;
                }

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.login = user.login;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.name = token.name as string;
                session.user.login = token.login as string;
                session.user.email = token.email as string;
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET
});

export { handler as GET, handler as POST };
