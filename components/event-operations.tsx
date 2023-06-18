"use client"

import * as React from "react"
import Link from "next/link"
import {redirect, useRouter} from "next/navigation"
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
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {QRCode} from "antd";
import Modal from "@/components/modal";
import {AgreementArrowIncrease} from "@vectopus/atlas-icons-react";

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
  const [showShareModal, setShowShareModal] = React.useState<boolean>(false)


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
              <TooltipContent>Compartilhar</TooltipContent>
              <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)}>
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

      <Modal showModal={showShareModal} setShowModal={setShowShareModal}>
        <div
          className="inline-block w-full bg-white align-middle shadow-xl transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200">
          <div
            className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 p-4 pt-8 sm:px-16">
            <AgreementArrowIncrease size={24}   />
            <h3 className="flex flex-row text-lg font-medium">Compartilhe seu evento</h3>
          </div>

          <div className="flex flex-col space-y-6 bg-gray-50 py-6 text-left sm:rounded-b-2xl">
            <div className="mx-auto rounded-lg border-2 border-gray-200 bg-white p-4">
              <QRCode value={`https://plan-my-event.vercel.app/event/participant/${event.id}`}/>
            </div>

            <div className="mx-auto px-4 sm:px-16">
              <Button
                onClick={() => {
                  copyEventLink(event.id)
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
              >
                <Icons.copyBoard className="h-4 w-4"/> Copiar Link
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
