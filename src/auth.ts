import { PrismaAdapter } from '@auth/prisma-adapter';
// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Пример OAuth: import Google from "next-auth/providers/google";
import { prisma } from "./utils/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma), // включи, если используешь БД для аккаунтов/сессий
    session: { strategy: "jwt" },      // просто и без БД-сессий
    providers: [
        Credentials({
            name: "Login / Password",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" },
            }
        })
    ]

});
