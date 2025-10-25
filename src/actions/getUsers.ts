import { prisma } from "@/utils/prisma"

export default async function getUsersData() {
    try {
        const users = await prisma.users.findMany()
        return { success: true, data: users }
    }
    catch (error) {
        return { success: false, error: error }
    }

}