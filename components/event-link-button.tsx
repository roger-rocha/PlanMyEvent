"use client"
import {toast} from "@/hooks/use-toast";
import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import React from "react";

interface EventProps {
  link: string
}

export function EventLinkButton({link} : EventProps) {
  const copyEventLink = (link: string) => {
    navigator.clipboard.writeText(`https://plan-my-event.vercel.app/event/participant/${link}`);
    toast({
      description: "Link do evento foi copiado.",
    })
  }

  return (
    <Button variant="outline" onClick={() => copyEventLink(link)}>
      <Icons.link className="h-4 w-4 mr-2"></Icons.link> Copiar Link
    </Button>
  )
}
