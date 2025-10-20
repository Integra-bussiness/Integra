"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { IFormData } from "@/types/form-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Company } from "@/interfaces/user-interfaces"

interface SignupFormProps extends React.ComponentProps<"div"> {
    companies: Company[];
}

export function SignupForm({
    className,
    companies,
    ...props
}: SignupFormProps) {

    const [userData, setUserData] = useState<IFormData>({
        name: "",
        login: "",
        password: "",
        confirmPassword: '',
        companyId: null
    })


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Создайте аккаунт</CardTitle>
                    <CardDescription>
                        Создайте ваш аккаунт, привязанный к вашей компании
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="nameReg">Ваше имя</FieldLabel>
                                <Input id="nameReg" type="text" placeholder="John Doe" required onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="loginReg">Логин</FieldLabel>
                                <Input
                                    onChange={(e) => setUserData({ ...userData, login: e.target.value })} value={userData.login}
                                    id="loginReg"
                                    type="text"
                                    placeholder="Логин"
                                    required
                                />
                            </Field>
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                        <Input placeholder="Пароль" id="password" type="password" required onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirmPassword">
                                            Повторите пароль
                                        </FieldLabel>
                                        <Input placeholder="Повторите пароль" id="confirmPassword" type="password" required onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} value={userData.confirmPassword} />
                                    </Field>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="companyID">Выберите вашу компанию</FieldLabel>
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {companies.map(comp => (
                                                <SelectItem key={comp.name} value={comp.id.toString()}>{comp.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <FieldDescription>
                                    Должен быть больше 8 символов.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit">Создать аккаунт</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
