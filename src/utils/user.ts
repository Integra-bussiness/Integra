import { prisma } from "./prisma"

export const getUser = async (formLogin: string) => {
    const user = await prisma.user.findFirst({ where: { login: formLogin } })

    return user
}