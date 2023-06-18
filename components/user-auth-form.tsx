"use client"

import * as React from "react"
import {useSearchParams} from "next/navigation"
import {toast} from "@/hooks/use-toast"
import {zodResolver} from "@hookform/resolvers/zod"
import {signIn} from "next-auth/react"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {cn} from "@/lib/utils"
import {userAuthSchema} from "@/lib/validations/auth"
import {Icons} from "@/components/icons"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: "Aconteceu algum erro.",
        description: "O seu login não deu certo. Tente novamente.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Verifique seu email",
      description: "Enviamos um link mágico para você. Verifique sua caixa de spam também.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form className="grid w-full 1 items-center gap-4 text-zinc-800" onSubmit={handleSubmit(onSubmit)}>
        <Label>Email</Label>
        <Input
          id="email"
          placeholder="nome@outlook.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading || isGitHubLoading}
          {...register("email")}
        />
        {errors?.email && (
          <p className="px-1 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
        <button
          type="submit"
          className="flex h-[44px] items-center justify-center rounded-lg bg-zinc-900 py-2.5 px-4 font-medium text-white hover:bg-zinc-700"
          disabled={isLoading}
        >
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Entrar com o email
        </button>
      </form>
      <div className="mt-10 grid grid-cols-3 col-auto">
        <div className="inset-0 flex items-center">
          <span className="w-full border-t"/>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Ou entrar
								</span>
        </div>
        <div className="inset-0 flex items-center">
          <span className="w-full border-t"/>
        </div>
      </div>

      <button
        type="button"
        className="flex h-[44px] items-center justify-center rounded-lg bg-zinc-900 py-2.5 px-4 font-medium text-white hover:bg-zinc-700"
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google")
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
      <button
        type="button"
        className="flex h-[44px] items-center justify-center rounded-lg bg-zinc-900 py-2.5 px-4 font-medium text-white hover:bg-zinc-700"
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  )
}
