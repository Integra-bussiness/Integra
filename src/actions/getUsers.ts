import { unstable_cache } from 'next/cache';
import { prisma } from "@/utils/prisma"

const getUsersDataCached = (page: number, pageSize: number) =>
    unstable_cache(
        async () => {
            const skip = (page - 1) * pageSize;

            return prisma.users.findMany({
                skip: skip,
                take: pageSize,
                include: { companies: true },
                orderBy: { id: "asc" }
            });
        },
        ['users-data'],
        { revalidate: 60 }
    );

export default async function getUsersData(page: number = 1, pageSize: number = 25) {
    try {
        const getData = await getUsersDataCached(page, pageSize)
        const users = await getData()

        return { success: true, data: users }
    }
    catch (error) {
        return { success: false, error: error }
    }
}