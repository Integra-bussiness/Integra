import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH1 } from "@/components/ui/typography"
import DataTable from "@/components/ux/DataTable/data-table"
import { products } from "@/generated/prisma"
import { prisma } from "@/utils/prisma"
import { BoxIcon } from "lucide-react"
import { columns } from "./columns"

export default async function ProductsPage() {

    const [products, productsAvailable, productsCount] = await Promise.all(
        [
            prisma.products.findMany(),
            prisma.products.count({
                where: { availability_status: "in_stock" }
            }),
            prisma.products.count()
        ]
    )

    const outOfStock = productsCount - productsAvailable


    return (
        <div>
            <TypographyH1 className="col-span-full">
                Сотрудники
                <p className="mt-0 text-xl text-gray-400 font-normal">Информация о действиях сотрудников</p>
            </TypographyH1>

            <div className="grid grid-cols-3 mt-[25px] gap-5">
                <Card>
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">
                        Всего товаров <BoxIcon color="grey" capHeight={25} />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {Number(productsCount)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">
                        В наличии <BoxIcon className="income-color" capHeight={25} />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {Number(productsAvailable)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between items-center text-gray-400 font-bold">
                        Нет в наличии <BoxIcon className="expense-color" capHeight={25} />
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-4xl flex gap-[5px] items-center">
                            {Number(outOfStock)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <DataTable columns={columns} data={products} />
        </div>
    )
}