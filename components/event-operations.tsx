"use client"

import * as React from "react"
import Link from "next/link"
import {redirect, useRouter} from "next/navigation"
import {toast} from "@/hooks/use-toast"
import {Event} from ".prisma/client"

import {Icons} from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

async function deleteEvent(eventId: string, eventTitle: string) {
  const response = await fetch(`/api/events/${eventId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Aconteceu algum imprevisto.",
      description: "O seu evento não foi deletado. Por favor tente novamente.",
      variant: "destructive",
    })
  }

  toast({
    title: "Evento deletado.",
    description: `O evento ${eventTitle} foi deletado com sucesso.`,
  });

  return true
}

interface EventOperationsProps {
  event: Pick<Event, "id" | "title">
}

export function EventOperations({event}: EventOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const copyEventLink = (link: string) => {
    navigator.clipboard.writeText(`https://plan-my-event.vercel.app/event/participant/${link}`);
    toast({
      description: "Link do evento foi copiado.",
    })
  }

  return (
    <>
      <div className="flex flex-row flex-nowrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
              <Link href={`/event/${event.id}`}>
                <Button variant="ghost" size="sm" onClick={() => redirect(`/event/${event.id}`)}>
                  <Icons.pencil className="h-4 w-4"></Icons.pencil>
                </Button>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent>Copiar Link</TooltipContent>
              <Button variant="ghost" size="sm" onClick={() => copyEventLink(event.id)}>
                <Icons.link className="h-4 w-4"></Icons.link>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent>Ver Relatório</TooltipContent>
              <Link href={`/event/report/${event.id}`}>
                <Button variant="ghost" size="sm" onClick={() => redirect(`/event/report/${event.id}`)}>
                  <Icons.report className="h-4 w-4"></Icons.report>
                </Button>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent>Deletar</TooltipContent>
              <Button variant="ghost" size="sm" onClick={() => setShowDeleteAlert(true)}>
                <Icons.trash className="h-4 w-4"></Icons.trash>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>


      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que quer deletar esse evento?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteEvent(event.id, event.title)

                if (deleted) {
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
              ) : (
                <Icons.trash className="mr-2 h-4 w-4"/>
              )}
              <span>Deletar</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
