"use client"

import * as React from "react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {toast} from "@/hooks/use-toast"
import {Event} from "@prisma/client"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";

async function deleteEvent(eventId: string) {
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
      <div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent>Copiar Link do Evento</TooltipContent>
              <Button variant="outline" size="sm" onClick={() => copyEventLink(event.id)}>
                <Icons.link className="h-4 w-4"></Icons.link>
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent><p>Opções</p></TooltipContent>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
                  <Icons.ellipsis className="h-4 w-4"/>
                  <span className="sr-only">Abrir</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link className="flex w-full text-blue-600 focus:bg-blue-50" href={`/event/report/${event.id}`}>
                      Ver Relatório
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>
                    <Link href={`/event/${event.id}`} className="flex w-full">
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
                    onSelect={() => setShowDeleteAlert(true)}
                  >
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

                const deleted = await deleteEvent(event.id)

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
