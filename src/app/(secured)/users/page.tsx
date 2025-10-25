import getUsers from "@/actions/getUsers"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {



    const { page } = await searchParams;
    const currentPage = page ? Number(page) : 1;
    const result = await getUsers(currentPage, 25)

    console.log(result);
    console.log(currentPage);



    if (!result.success) {
        return (
            <div>
                <TypographyH1>
                    Сотрудники
                    <p className="mt-0 text-xl text-gray-400 font-normal">Информация о действиях сотрудников</p>
                </TypographyH1>
                <Card className="p-4 text-red-600 bg-red-50 rounded mt-[25px]">
                    <CardHeader className="">
                        Не удалось получить данные
                    </CardHeader>
                    <CardContent>
                        <span>
                            {result.error instanceof Error ? result.error.message : String(result.error)}
                        </span>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="">
            <TypographyH1>
                Сотрудники
                <p className="mt-0 text-xl text-gray-400 font-normal">Информация о действиях сотрудников</p>
            </TypographyH1>

            <Card className="pb-0 gap-0 pt-[10px]">
                <CardHeader className="px-[10px]">
                    <TypographyH2 className="!pb-0 text-xl">Список сотрудников</TypographyH2>
                    <Separator />
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Название отдела</TableHead>
                            <TableHead>ФИО</TableHead>
                            <TableHead>Должность</TableHead>
                            <TableHead>Активность</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.data &&
                            result.data.map((user) => {
                                return (
                                    <TableRow key={user.name + user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.companies?.name}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <div className="flex gap-6 justify-center">
                                    <Button asChild disabled={currentPage <= 1}>
                                        <Link href={`?page=${currentPage - 1}`}>Предыдущая страница</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={`?page=${currentPage + 1}`}>Следующая страница</Link>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>

        </div >
    )

}