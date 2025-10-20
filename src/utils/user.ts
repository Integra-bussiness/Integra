import { prisma } from "./prisma"

export const getUser = async (formLogin: string) => {
    const user = await prisma.users.findFirst({ where: { login: formLogin } })
    return user
}
