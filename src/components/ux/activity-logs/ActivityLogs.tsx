import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TypographyH2 } from "@/components/ui/typography";
import { prisma } from "@/utils/prisma";

export default async function ActivityLogs() {

    const logs = await prisma.activity_logs.findMany()

    return (
        <Card className="pt-2.5 row-span-2">
            <CardHeader className="px-[10px]">
                <TypographyH2 className="!pb-0 text-xl">Последние активности</TypographyH2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID пользователя</TableHead>
                            <TableHead>Действие</TableHead>
                            <TableHead>Детали</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map(log => {
                            return (
                                <TableRow key={log.id}>
                                    <TableCell>{log.user_id}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.details}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}