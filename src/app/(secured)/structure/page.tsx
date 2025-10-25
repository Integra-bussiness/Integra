import { Prisma } from "@/generated/prisma"
import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TypographyH2 } from "@/components/ui/typography";
import { Table as TableIcon } from "lucide-react";

export default async function StructurePage() {

    const structure = Prisma.dmmf.datamodel.models;

    return (
        <div className="gap-[20px] grid mt-[25px] 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 will-change-auto">
            {structure.map((table) => {
                return (
                    <Card key={table.name} className="gap-[5px] pt-[10px] break-inside-avoid mb-[20px] ">
                        <CardHeader>
                            <TypographyH2 className='!pb-0 text-[20px] flex gap-[5px] items-center '>
                                <TableIcon /> <span className="leading-none">{table.name}</span>
                            </TypographyH2>
                        </CardHeader>
                        <Table>
                            <TableHeader>
                                <TableRow >
                                    <TableHead className="text-center">Название поля</TableHead>
                                    <TableHead className="text-center">Тип данных</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {table.fields.map((field) => {
                                    return (
                                        <TableRow className="text-center" key={field.name + field.type}>
                                            <TableCell>{field.name}</TableCell>
                                            <TableCell>{field.type}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Card>
                )
            })}
        </div >

    )
}