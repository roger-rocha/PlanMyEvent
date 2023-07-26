"use client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";
import {EventOperationsProps} from "@/components/event-operations";
import {redirect} from "next/navigation";
import Link from "next/link";


export async function ReportAction({event}: EventOperationsProps){
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <TooltipContent>Ver Relatório</TooltipContent>
              <Link href={`event/report/${event.id}`}>
                <Button variant="ghost" size="sm">
                  <Icons.report className="h-4 w-4"></Icons.report>
                </Button>
              </Link>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
