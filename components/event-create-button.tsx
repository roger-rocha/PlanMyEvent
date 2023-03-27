"use client"

import * as React from "react"
import {useRouter} from "next/navigation"
import {toast} from "@/hooks/use-toast"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button"

interface EventCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
}

export function EventCreateButton({className, ...props}: EventCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Evento Novo",
        details: "Detalhes do seu evento novo",
        dateEvent: new Date().toISOString()
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Você chegou no limite do seu plano de 3 eventos.",
          description: "Por favor faça o upgrade para o plano Pro.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Aconteceu algum imprevisto.",
        description: "Não foi possível criar o seu evento. Por favor tente novamente.",
        variant: "destructive",
      })
    }

    const event = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/event/${event.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants(),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
      ) : (
        <Icons.add className="mr-2 h-4 w-4"/>
      )}
      Novo evento
    </button>
  )
}
