import { getUser } from "@/utils/user";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const handler = NextAuth({
    session: { strategy: "jwt", maxAge: 3600 },
    providers: [
        Credentials({
            name: "Login / Password",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                if (!credentials?.login || !credentials?.password) {
                    throw new Error("Введите логин и пароль");
                }

                const user = await getUser(credentials.login);

                if (!user) {
                    throw new Error("Пользователь с данным логином не найден");
                }

                if (!user.companyId) {
                    throw new Error("Обратитесь к руководителю");
                }

                if (credentials.password !== user.password) {
                    throw new Error("Неверный логин или пароль");
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
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.login = token.login as string;
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };
