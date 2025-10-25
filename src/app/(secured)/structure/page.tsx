import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TypographyH2 } from "@/components/ui/typography";
import { Prisma } from "@/generated/prisma";

export default async function StructurePage() {

    const allModels = Prisma.dmmf.datamodel.models

    return (
        <>
            <div className="grid grid-cols-2 gap-[25px]">
                {
                    allModels.map((model) => {
                        return (
                            <Card key={model.name}>
                                <CardHeader>
                                    <TypographyH2 className="text-xl">
                                        Таблица: {model.name}
                                    </TypographyH2>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Название поля</TableHead>
                                                <TableHead>Тип данных</TableHead>
                                                <TableHead>Уникальное</TableHead>
                                                <TableHead>Количество</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                {model.fields.map((field) => <TableCell key={field.name}>{field.type}</TableCell>)}
                                            </TableRow>
                                            <TableRow>
                                                {model.fields.map((field) => <TableCell key={field.name}>{field.isUnique}</TableCell>)}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}