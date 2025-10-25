import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { prisma } from "@/utils/prisma";
import { BoxIcon, RussianRuble, ShoppingCart, Users2 } from "lucide-react";


export default async function DashboardStats() {


    const [incomeStats, expenceStats, ordersCount, clientsCount, productsCount] = await Promise.all([

        // Доходы
        prisma.finances.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                type: "доход",
            }
        }),
        // Доходы

        // Расходы
        prisma.finances.aggregate({
            _sum: { amount: true },
            where: { type: "расход" }
        }),
        // Расходы

        prisma.orders.count(),
        prisma.clients.count(),
        prisma.products.count()
    ])

    return (
        <section className="grid grid-cols-4 gap-[20px] mt-[25px]">
            <Card className="transition-all  hover:shadow-gray-400 hover:shadow-md ">
                <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Выручка <RussianRuble color="grey" capHeight={25} /></CardHeader>
                <CardContent>
                    <div className="font-bold text-4xl flex gap-[5px] items-center">
                        {`${Number(incomeStats._sum.amount) - Number(expenceStats._sum.amount)} руб.`}
                    </div>
                </CardContent>
                <CardFooter>
                    <span className="text-[14px] income-color">+12.5% от прошлого месяца </span>
                </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-gray-400 hover:shadow-md">
                <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Заказы <ShoppingCart color="grey" capHeight={25} /></CardHeader>
                <CardContent>
                    <div className="font-bold text-4xl flex gap-[5px] items-center">
                        {ordersCount}
                    </div>
                </CardContent>
                <CardFooter>
                    <span className="text-[14px] expense-color">-30% от прошлого месяца </span>
                </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-gray-400 hover:shadow-md">
                <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Клиенты <Users2 color="grey" capHeight={25} /></CardHeader>
                <CardContent>
                    <div className="font-bold text-4xl flex gap-[5px] items-center">
                        {clientsCount}
                    </div>
                </CardContent>
                <CardFooter>
                    <span className="text-[14px] income-color">+200% от прошлого месяца </span>
                </CardFooter>
            </Card>
            <Card className="transition-all hover:shadow-gray-400 hover:shadow-md">
                <CardHeader className="flex justify-between items-center text-gray-400 font-bold">Товары <BoxIcon color="#99a1af" capHeight={25} /></CardHeader>
                <CardContent>
                    <div className="font-bold text-4xl flex gap-[5px] items-center">
                        {productsCount}
                    </div>
                </CardContent>
                <CardFooter>
                    <span className="text-[14px] income-color">+2 новых товара </span>
                </CardFooter>
            </Card>
        </section>
    )
}