"use client";

import {EventOperationsProps, FormEventData, time} from "@/components/event-operations";
import {useForm} from "react-hook-form";
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
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/calendar";
import {ptBR} from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import * as React from "react";
import {toast} from "@/hooks/use-toast";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export function EditAction({event} : EventOperationsProps) {
  const router = useRouter()

  const {register, handleSubmit, setValue, watch} = useForm<FormEventData>({
    defaultValues: {
      title: event.title,
      details: event.details,
      dateEvent: event.dateEvent.toString()
    }
  });
  const [openEdit, setOpenEdit] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date(event.dateEvent))
  const hours = event.dateEvent.getUTCHours().toString().padStart(2, '0');
  const minutes = event.dateEvent.getUTCMinutes().toString().padStart(2, '0');
  const [hour, setHour] = useState<string>(`${hours}:${minutes}`)

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

    setOpenEdit(false)

    return toast({
      description: "Seu evento foi salvo.",
    })
  }

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
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <TooltipContent>Editar</TooltipContent>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Icons.pencil className="h-4 w-4"></Icons.pencil>
                </Button>
              </DialogTrigger>
              <DialogContent className={"sm:max-w-[600px]"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Editando seu evento</DialogTitle>
                    <DialogDescription>Preencha os campos abaixo para editar seu evento.</DialogDescription>
                  </DialogHeader>
                  <div className={" grid gap-4"}>
                    <div className="grid gap-2 mt-5">
                      <Label>Nome</Label>
                      <Input
                        type="text"
                        id="title"
                        placeholder="Festa do pijama"
                        {...register("title")}>
                      </Input>
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label>Detalhes sobre o evento</Label>
                      <Textarea
                        placeholder="Detalhes"
                        id="details"
                        {...register("details")}>
                      </Textarea>
                    </div>
                    <div className="mt-2 grid gap-2">
                      <Label className="mb-1">Data e Horário</Label>
                      <div className="flex flex-row w-full gap-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-2/3 justify-start text-left font-normal",
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
                          <SelectTrigger className="w-1/3">
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
                  </div>
                  <DialogFooter>
                    <Button type="submit"
                            className="flex items-center mt-5 justify-center gap-2 rounded-md border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
                    >
                      <Icons.archive className="h-4 w-4"/> Salvar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}
