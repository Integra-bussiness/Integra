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

import { FormEvent, useState } from "react"
// import { loginUser } from "@/actions/loginUser"
import { signIn } from "next-auth/react";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    interface LoginData {
        login: string,
        password: string,
    }

    const [formData, setFormData] = useState<LoginData>({
        login: "",
        password: "",
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: true,
            callbackUrl: '/dashboard',
            login: formData.login,
            password: formData.password,
        });

        return result;
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Войдите в свой акканут</CardTitle>
                    <CardDescription>
                        Введите данные, которые передал вам руководитель
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="login">Ваш логин</FieldLabel>
                                <Input
                                    id="login"
                                    type="text"
                                    placeholder="Логин"
                                    value={formData.login}
                                    onChange={(e) => { setFormData({ ...formData, login: e.target.value }) }}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                </div>
                                <Input id="password" value={formData.password} type="password" placeholder="Пароль" required onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>

                                <FieldDescription className="text-center">
                                    Don`t have an account? <a href="#">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
