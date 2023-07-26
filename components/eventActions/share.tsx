"use client";
import {EventOperationsProps} from "@/components/event-operations";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {QRCode} from "antd";
import * as React from "react";
import {toast} from "@/hooks/use-toast";

export function ShareAction({event} : EventOperationsProps){

  const copyEventLink = (link: string) => {
    navigator.clipboard.writeText(`https://plan-my-event.vercel.app/event/participant/${link}`);
    toast({
      description: "Link do evento foi copiado.",
    })
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <TooltipContent>Compartilhar</TooltipContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Icons.link className="h-4 w-4"></Icons.link>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Compartilhe seu evento</DialogTitle>
                  <DialogDescription>Copie o link ou utilize o Qr Code para compartilhar seu
                    evento.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-6 bg-gray-50 py-6 text-left sm:rounded-b-2xl">
                  <div className="mx-auto rounded-lg border-2 border-gray-200 bg-white p-4">
                    <QRCode value={`https://plan-my-event.vercel.app/event/participant/${event.id}`}/>
                  </div>
                </div>
                <DialogFooter className={"xs:w-full"}>
                  <Button
                    onClick={() => {
                      copyEventLink(event.id)
                    }}
                    className="flex items-center justify-center gap-2 rounded-md border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
                  >
                    <Icons.copyBoard className="h-4 w-4"/> Copiar Link
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
