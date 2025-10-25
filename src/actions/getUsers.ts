import { unstable_cache } from 'next/cache';
import { prisma } from "@/utils/prisma"

const getUsersDataCached = unstable_cache(
    async () => {
        return prisma.users.findMany({
            include: { companies: true }
        });
    },
    ['users-data'],
    { revalidate: 60 }
);

export default async function getUsersData() {
    try {
        const users = await getUsersDataCached()
        return { success: true, data: users }
    }
    catch (error) {
        return { success: false, error: error }
    }

}