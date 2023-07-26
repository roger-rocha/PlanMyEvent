"use client";
import {EventOperationsProps} from "@/components/event-operations";
import {useRouter} from "next/navigation";
import * as React from "react";
import {toast} from "@/hooks/use-toast";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

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
export function DeleteAction({event}: EventOperationsProps){
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)


  return (
    <>
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
