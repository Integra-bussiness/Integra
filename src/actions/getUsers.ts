import { unstable_cache } from 'next/cache';
import { prisma } from "@/utils/prisma"

const getUsersDataCached = (page: number, pageSize: number) =>
    unstable_cache(
        async () => {
            const currPage = page && page > 0 ? page : 1;
            const currPageSize = pageSize && pageSize > 0 ? pageSize : 25;
            const skip = (currPage - 1) * currPageSize;

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
        const getData = getUsersDataCached(page, pageSize)
        const users = await getData()

        return { success: true, data: users }
    }
    catch (error) {
        return { success: false, error: error }
    }
}