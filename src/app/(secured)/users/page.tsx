import getUsers from "@/actions/getUsers"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

            </Card>

        </div>
    )

}