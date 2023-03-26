import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 right-4 md:top-8 md:right-8"
        )}
      >
        <>
          Login
          <Icons.user className="ml-2 h-4 w-4" />
        </>
      </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma Conta
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Crie a sua conta com alguns dos métodos abaixo
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Ao clicar em continuar, você aceita os{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Termos de serviço
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Política de privacidade
            </Link>
            .
          </p>
        </div>
    </div>
  )
}
