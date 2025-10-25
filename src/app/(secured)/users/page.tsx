import getUsers from "@/actions/getUsers"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default async function UsersPage() {

    const result = await getUsers()

    console.log(result);


    if (!result.success) {
        return (
            <Card className="p-4 text-red-600 bg-red-50 rounded">
                <CardHeader className="">
                    Не удалось получить данные
                </CardHeader>
                <CardContent>
                    <span>
                        {result.error instanceof Error ? result.error.message : String(result.error)}
                    </span>
                </CardContent>
            </Card>
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
                            <TableHead>Стобец 1</TableHead>
                            <TableHead>Стобец 2</TableHead>
                            <TableHead>Стобец 3</TableHead>
                            <TableHead>Стобец 4</TableHead>
                            <TableHead>Стобец 5</TableHead>
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
                </Table>
            </Card>

        </div>
    )

}