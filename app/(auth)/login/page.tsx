import {Metadata} from "next"
import Link from "next/link"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button"
import {UserAuthForm} from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Entre na sua conta",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 left-4 md:top-8 md:left-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-12 w-12" />
          <h1 className="text-3xl font-bold text-black">Plan My Event</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Use o seu email para entrar com segurança
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
