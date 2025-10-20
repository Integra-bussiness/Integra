
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/ux/login/login-form";
import { SignupForm } from "@/components/ux/register/register-form";
import { prisma } from "@/utils/prisma";

export default async function Home() {

  const companies = await prisma.company.findMany()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="registration">
          <TabsList>
            <TabsTrigger className="cursor-pointer" value="login">Вход</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="registration">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="registration">
            <SignupForm companies={companies} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
