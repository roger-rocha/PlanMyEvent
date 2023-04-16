"use client"
import {Event} from "@prisma/client"
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Button, buttonVariants} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";
import Link from "next/link";
import * as React from "react";
import {useEffect, useState} from "react";
import {toast} from "@/hooks/use-toast";
import {DatePickerStateProvider} from "@rehookify/datepicker"
import {Root} from "@/components/ui/date-time-picker/date-time-picker";

interface EventProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}


type FormNewEventData = {
  title: string;
  details: string;
  dateEvent: string;
}

export function EventEditor({event}: EventProps) {
  const {register, handleSubmit, setValue, watch} = useForm<FormNewEventData>();
  const [selectedDates, onDatesChange] = useState<Date[]>([])
  const router = useRouter()

  async function onSubmit(data: { title: string, details: string, dateEvent: string }) {
    console.log(data)
    const response = await fetch(`/api/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        details: data.details,
        dateEvent: data.dateEvent
      }),
    })

    if (!response?.ok) {
      return toast({
        title: "Aconteceu um imprevisto.",
        description: "Seu evento não foi salvo. Por favor tente novamente.",
        variant: "destructive",
      })
    }

    router.refresh()


    return toast({
      description: "Seu evento foi salvo.",
    })
  }

  useEffect(() => {
    return () => {
      console.log(JSON.stringify(watch(), null, 2))
    };
  }, [watch]);


  useEffect(() => {
    setValue("dateEvent", selectedDates[0]?.toISOString())
  }, [selectedDates, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            Editando o seu evento
          </h1>
          <div className="grid w-4/5 items-center gap-1.5">
            <Label>Nome do Evento</Label>
            <Input
              type="text"
              id="title"
              placeholder={event.title}
              {...register("title")}>

            </Input>
          </div>
          <div className="mt-8 grid w-4/5 gap-1.5">
            <Label>Detalhes sobre o evento</Label>
            <Textarea
              placeholder={event.details}
              id="details"
              {...register("details")}
            >
            </Textarea>
          </div>
          <div className="mt-8 w-4/5">
            <Label>Data do evento</Label>
            <DatePickerStateProvider
              config={{
                selectedDates,
                onDatesChange,
                dates: {
                  mode: "single",
                  toggle: true,
                },
                locale: {
                  locale: "pt-BR",
                  options: {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                },
              }}
            >
              <Root/>
            </DatePickerStateProvider>
          </div>
        </div>
        <Button type="submit" className="mt-3">
          Salvar
        </Button>
      </section>
    </form>
  )
}
