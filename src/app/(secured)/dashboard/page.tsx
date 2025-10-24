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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BoxIcon, RussianRuble, ShoppingCart, Users2 } from "lucide-react";
import { prisma } from "@/utils/prisma";
import { TableSkeleton } from "@/components/common/TableSkeleton/TableSkeleton";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";




export default async function DashboardPage() {

    const [data, aggregation, ordersCount, clientsCount, productsCount] = await Promise.all([
        prisma.finances.findMany({
            orderBy: { transaction_date: 'desc' }
        }),

        prisma.finances.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                type: "доход",
            }
        }),
        prisma.orders.count(),
        prisma.clients.count(),
        prisma.products.count(),
    ])


    return (
        <main>
            <TypographyH1>
                Dashboard
                <p className="mt-1 text-xl text-gray-400 font-normal">Основные показатели вашего бизнеса</p>
            </TypographyH1>
            <section className="grid grid-cols-4 gap-[20px] mt-[25px]">
                <Card className="hover:bore">
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Выручка <RussianRuble color="grey" capHeight={25} /></CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {`${Number(aggregation._sum.amount)} руб.` ?? 'Ошибка подсчета'}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <span className="text-[14px] income-color">+12.5% от прошлого месяца </span>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Заказы <ShoppingCart color="grey" capHeight={25} /></CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {ordersCount ?? 'Ошибка подсчета'}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <span className="text-[14px] expense-color">-30% от прошлого месяца </span>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Клиенты <Users2 color="grey" capHeight={25} /></CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {clientsCount ?? 'Ошибка подсчета'}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <span className="text-[14px] income-color">+200% от прошлого месяца </span>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Товары <BoxIcon color="#99a1af" capHeight={25} /></CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {productsCount ?? 'Ошибка подсчета'}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <span className="text-[14px] income-color">+2 новых товара </span>
                    </CardFooter>
                </Card>
            </section>
            <section className="mt-[50px]">
                <TypographyH2>Финансы</TypographyH2>
                <div className="mt-[25px] overflow-x-auto rounded border border-gray-300 bg-white">
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
                                        <TableCell>{f.category ?? "нет категории"}</TableCell>
                                        <TableCell>{`${f.amount?.toString()} руб.` ?? "0"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Итого:</TableCell>
                                    <TableCell>{Number(aggregation._sum.amount)} руб.</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Suspense>
                    </Table>
                </div>
            </section>
        </main>
    );
}
