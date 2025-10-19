import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./utils/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Login / Password",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
                const user = await prisma.user.findFirst({ where: { login: credentials?.login } });

                if (!user) {
                    return null
                }


                return user

            }
        })
    ]

});
