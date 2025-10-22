import { prisma, withPrismaRetry } from "@/utils/prisma"

export default async function Clients() {

    // const q = <T,>(f: () => Promise<T>) => withPrismaRetry(f, 5);

    const users = await prisma.users.findMany({})

    console.log(users);


    return (
        <div>
            {users.map(user => (
                <p key={user.id}>{user.id} - {user.name} - {user.company_id} - {user.role}</p>
            ))}
        </div>
    )
}


