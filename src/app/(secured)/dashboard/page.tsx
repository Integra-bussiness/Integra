import React, { Suspense } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableFooter,
} from "@/components/ui/table";
import { prisma } from "@/utils/prisma";
import { TableSkeleton } from "@/components/common/TableSkeleton/TableSkeleton";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DashboardStats from "@/components/ux/DashboardStats/main-stats";
import { unstable_cache } from "next/cache";




export default async function DashboardPage() {

    const getDashboardData = unstable_cache(
        async () => {
            const [data, incomeStats, expenceStats] = await Promise.all([
                prisma.finances.findMany({
                    orderBy: { transaction_date: 'desc' }
                }),
                prisma.finances.aggregate({
                    _sum: { amount: true },
                    where: { type: "доход" }
                }),
                prisma.finances.aggregate({
                    _sum: { amount: true },
                    where: { type: "расход" }
                }),
            ]);

            return { data, incomeStats, expenceStats };
        },
        ['dashboard-data'], // один ключ для всего
        { revalidate: 60 }
    );


    const { data, incomeStats, expenceStats } = await getDashboardData()

    return (
        <main>
            <TypographyH1>
                Dashboard
                <p className="mt-1 text-xl text-gray-400 font-normal">Основные показатели вашего бизнеса</p>
            </TypographyH1>
            <DashboardStats />
            <section className="mt-[50px]">
                <Card className="pb-0 gap-0 pt-2.5">
                    <CardHeader className="pt-2.5">
                        <TypographyH2 className="pb-0! text-xl">Финансы</TypographyH2>
                        <Separator />
                    </CardHeader>
                    <CardContent className="px-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Дата</TableHead>
                                    <TableHead>Тип</TableHead>
                                    <TableHead>Категория</TableHead>
                                    <TableHead>Сумма</TableHead>
                                </TableRow>
                            </TableHeader>
                            <Suspense fallback={<TableSkeleton />}>
                                <TableBody>
                                    {data.map((f) => (
                                        <TableRow key={f.id} className="hover:bg-gray-100">
                                            <TableCell>{f.transaction_date?.toLocaleDateString?.() ?? String(f.transaction_date)}</TableCell>
                                            <TableCell>{f.type}</TableCell>
                                            <TableCell>{f.category}</TableCell>
                                            <TableCell>{`${f.amount?.toString()} руб.`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3}>Итого:</TableCell>
                                        <TableCell>{Number(incomeStats._sum.amount) - Number(expenceStats._sum.amount)} руб.</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Suspense>
                        </Table>
                    </CardContent>
                </Card>
            </section>
        </main >
    );
}
