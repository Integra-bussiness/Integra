import { TableSkeleton } from "@/components/common/TableSkeleton/TableSkeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TypographyH1, TypographyH2 } from "@/components/ui/typography"
import { prisma } from "@/utils/prisma"
import { PlusIcon, Search } from "lucide-react"
import { Suspense } from "react"

export default async function Clients() {

    const users = await prisma.users.findMany()

    return (
        <div>
            <TypographyH1 className="flex justify-between items-center">
                <div>
                    CRM
                    <p className="mt-1 text-xl text-gray-400 font-normal">Управление клиентской базой</p>
                </div>
                <Button className="text-[16px]"><PlusIcon />Добавить клиента</Button>
            </TypographyH1>
            <Card className="pb-0 gap-0 pt-[10px] mt-[25px]">
                <CardContent className="px-[10px] mt-4">
                    <InputGroup>
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupInput placeholder="Поиск клиентов..." />
                        <InputGroupAddon align='inline-end'>
                            <InputGroupButton variant="secondary">Искать</InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </CardContent>
                <CardContent className="px-0 mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Дата регистрации</TableHead>
                                <TableHead>ФИО</TableHead>
                                <TableHead>Роль</TableHead>
                                <TableHead>Статус</TableHead>
                            </TableRow>
                        </TableHeader>
                        <Suspense fallback={<TableSkeleton />}>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-100">
                                        <TableCell>{user.created_at?.toDateString()}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Suspense>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


