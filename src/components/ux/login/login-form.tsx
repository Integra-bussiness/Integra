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
import { redirect, useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })

        if (error) {
            toast.error(error.message)
            setError(error.message)
            setLoading(false)
            return
        }

        toast.success("Авторизация успешна!")
        setLoading(false)
        redirect('/dashboard')
    };

    return (
        <div className={cn(`flex flex-col gap-6`, className)} {...props}>
            <Card style={{ borderColor: `${error ? 'red' : ''}` }}>
                <CardHeader>
                    <CardTitle>Войдите в свой аккаунт</CardTitle>
                    <CardDescription>
                        Введите email и пароль для входа
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    style={{ borderColor: `${error ? 'red' : ''}` }}
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                <Input
                                    style={{ borderColor: `${error ? 'red' : ''}` }}
                                    id="password"
                                    value={formData.password}
                                    type="password"
                                    placeholder="Пароль"
                                    required
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </Field>
                            <Field>
                                <Button disabled={loading} type="submit">
                                    Войти {loading ? <Loader className="animate-spin" /> : null}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
