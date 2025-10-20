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
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { toast } from "sonner"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    interface LoginData {
        login: string,
        password: string,
    }

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<LoginData>({
        login: "",
        password: "",
    })

    const router = useRouter()


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true)

        const result = await signIn('credentials', {
            redirect: false,
            login: formData.login,
            password: formData.password,
        });

        if (result?.error) {
            toast.error(result.error)
            setError(result.error)
        }

        if (result?.ok) {
            setError('')
            router.push('/dashboard')
            toast.success("Авторизация успешна!")
        }

        setLoading(false)
    };


    return (
        <div className={cn(`flex flex-col gap-6`, className)} {...props}>
            <Card style={{ borderColor: `${error ? 'red' : ''}` }}>
                <CardHeader>
                    <CardTitle>Войдите в свой аккаунт</CardTitle>
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
                                    style={{ borderColor: `${error ? 'red' : ''}` }}
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
                                <Input

                                    style={{ borderColor: `${error ? 'red' : ''}` }} id="password" value={formData.password} type="password" placeholder="Пароль" required onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} />
                            </Field>
                            <Field>
                                <Button disabled={loading} type="submit">Войти {loading ? <Loader className="animate-spin" /> : null}</Button>

                                <FieldDescription className="text-center">
                                    Хотите зарегистрировать нового работника? <a href="#">Регистрация</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
