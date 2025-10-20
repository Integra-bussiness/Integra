import { prisma } from "@/utils/prisma"

export const registerUser = async (login: string, password: string) => {
    try {
        const isUnique = await prisma.user.findUnique({ where: { login: login } })

        if (!isUnique) {

            if (password.length < 8) {

            }

        }

    }
    catch { }
}