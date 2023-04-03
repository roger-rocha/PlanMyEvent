"use client"
import {Event} from "@prisma/client"
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";
import Link from "next/link";
import * as React from "react";
import ExampleTable from "@/components/ui/table/table";

interface EventProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}

export function EventReport({event}: EventProps) {
  return (
    <section className="mob:p-3 flex flex-col items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex items-center space-x-10">
        <Link
          href="/dashboard"
          className={cn(buttonVariants({variant: "ghost"}), "absolute top-4 left-4 md:top-8 md:left-8")}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4"/>
            Voltar
          </>
        </Link>
      </div>
      <div
        id="form-event"
        className="flex max-w-[980px] flex-col items-center"
      >
        <h1
          className="mb-10 text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Relatório do {event.title}
        </h1>
        <ExampleTable/>
      </div>
    </section>
  )
}
