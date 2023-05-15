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
import {Calendar} from "@/components/calendar";
import {ptBR} from "date-fns/locale";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {formatDate} from "@/components/event-item";
import {Card, CardContent, CardFooter} from "@/components/ui/card";

interface EventProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}


type FormNewEventData = {
  title: string;
  details: string;
  dateEvent: string;
}

const time = [
  {time: "00:00", label: "00:00"},
  {time: "00:30", label: "00:30"},
  {time: "01:00", label: "01:00"},
  {time: "01:30", label: "01:30"},
  {time: "02:00", label: "02:00"},
  {time: "02:30", label: "02:30"},
  {time: "03:00", label: "03:00"},
  {time: "03:30", label: "03:30"},
  {time: "04:00", label: "04:00"},
  {time: "04:30", label: "04:30"},
  {time: "05:00", label: "05:00"},
  {time: "05:30", label: "05:30"},
  {time: "06:00", label: "06:00"},
  {time: "06:30", label: "06:30"},
  {time: "07:00", label: "07:00"},
  {time: "07:30", label: "07:30"},
  {time: "08:00", label: "08:00"},
  {time: "08:30", label: "08:30"},
  {time: "09:00", label: "09:00"},
  {time: "09:30", label: "09:30"},
  {time: "10:00", label: "10:00"},
  {time: "10:30", label: "10:30"},
  {time: "11:00", label: "11:00"},
  {time: "11:30", label: "11:30"},
  {time: "12:00", label: "12:00"},
  {time: "12:30", label: "12:30"},
  {time: "13:00", label: "13:00"},
  {time: "13:30", label: "13:30"},
  {time: "14:00", label: "14:00"},
  {time: "14:30", label: "14:30"},
  {time: "15:00", label: "15:00"},
  {time: "15:30", label: "15:30"},
  {time: "16:00", label: "16:00"},
  {time: "16:30", label: "16:30"},
  {time: "17:00", label: "17:00"},
  {time: "17:30", label: "17:30"},
  {time: "18:00", label: "18:00"},
  {time: "18:30", label: "18:30"},
  {time: "19:00", label: "19:00"},
  {time: "19:30", label: "19:30"},
  {time: "20:00", label: "20:00"},
  {time: "20:30", label: "20:30"},
  {time: "21:00", label: "21:00"},
  {time: "21:30", label: "21:30"},
  {time: "22:00", label: "22:00"},
  {time: "22:30", label: "22:30"},
  {time: "23:00", label: "23:00"},
  {time: "23:30", label: "23:30"},
];

export function EventEditor({event}: EventProps) {
  const {register, handleSubmit, setValue, watch} = useForm<FormNewEventData>({
    defaultValues: {
      title: event.title,
      details: event.details,
      dateEvent: event.dateEvent.toString()
    }
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date(event.dateEvent))
  const hours = event.dateEvent.getUTCHours().toString().padStart(2, '0');
  const minutes = event.dateEvent.getUTCMinutes().toString().padStart(2, '0');
  const [hour, setHour] = useState<string>(`${hours}:${minutes}`)
  const router = useRouter()

  console.log(formatDate(event.dateEvent.toString()))

  async function onSubmit(data: { title: string, details: string, dateEvent: string }) {


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
    if (date) {
      if (hour) {
        let newDate = date.toISOString().slice(0, 11) + hour + ":00.000Z"
        console.log(newDate)
        setValue("dateEvent", newDate)
      } else {
        setValue("dateEvent", date.toISOString())
      }
    }

  }, [date, hour, setValue])

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
          <Card className="max-w-lg mob:w-full mob:min-h-screen overflow-hidden">
            <CardContent className="w-full grid gap-4">
              <div className="grid gap-2 mt-5">
                <Label>Nome</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Festa do pijama"
                  defaultValue={event.title}
                  {...register("title")}>

                </Input>
              </div>
              <div className="grid gap-2 mt-2">
                <Label>Detalhes sobre o evento</Label>
                <Textarea
                  placeholder="Detalhes"
                  id="details"
                  defaultValue={event.details}
                  {...register("details")}
                >
                </Textarea>
              </div>

              <div className="mt-2 grid gap-2">
                <Label className="mb-1">Data e Horário</Label>
                <div className="flex flex-row gap-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Icons.calendar className="mr-2 h-4 w-4"/>
                        {date ? format(date, "dd/MM/Y") : <span>Escolha uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        locale={ptBR}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Select defaultValue={hour} onValueChange={(e) => {
                    setHour(e)
                  }}>
                    <SelectTrigger className="w-[180px]">
                      <Icons.timer className="h-5 w-5"/> <SelectValue placeholder="Horário"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Horários</SelectLabel>
                        {time.map((time) => (
                          <SelectItem value={time.time}>{time.label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="w-full mt-5">
              <Button type="submit" size="lg" className="w-full">
                <Icons.archive className="mr-3 h-5 w-5"/> SALVAR
              </Button>
            </CardFooter>
          </Card>

        </div>

      </section>
    </form>
  )
}
