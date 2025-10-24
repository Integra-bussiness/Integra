import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const finances = await prisma.finances.findMany()

        console.log(finances);

        return NextResponse.json(
            { data: finances },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
                }
            }
        )
    }

    catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error,
            status: 500
        })
    }
}