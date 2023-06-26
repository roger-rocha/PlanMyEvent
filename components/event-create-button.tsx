"use client"

import * as React from "react"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {toast} from "@/hooks/use-toast"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
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

interface EventCreateButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
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

export function EventCreateButton({className, ...props}: EventCreateButtonProps) {
  const router = useRouter()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [hour, setHour] = useState<string>(`00:00`)

  async function onClick() {

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Evento Novo",
        details: "Detalhes do seu evento novo",
        dateEvent: new Date().toISOString()
      }),
    })

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Você chegou no limite do seu plano de 3 eventos.",
          description: "Por favor faça o upgrade para o plano Pro.",
          variant: "destructive",
        })
      }

      return toast({
        title: "Aconteceu algum imprevisto.",
        description: "Não foi possível criar o seu evento. Por favor tente novamente.",
        variant: "destructive",
      })
    }

    const event = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/event/${event.id}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icons.add className="w-4 h-4 mr-1.5">
          </Icons.add>
          Novo
        </Button>
      </DialogTrigger>
      <DialogContent className={"sm:max-w-[600px]"}>
        <DialogHeader>
          <DialogTitle>Criando seu evento</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para criar seu evento.</DialogDescription>
        </DialogHeader>
        <div className={" grid gap-4"}>
          <div className="grid gap-2 mt-5">
            <Label>Nome</Label>
            <Input
              type="text"
              id="title"
              placeholder="Festa do pijama">
            </Input>
          </div>
          <div className="grid gap-2 mt-2">
            <Label>Detalhes sobre o evento</Label>
            <Textarea
              placeholder="Detalhes"
              id="details"
            >
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
          <Button
            className="flex items-center justify-center gap-2 rounded-md border border-black bg-black py-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            <Icons.archive className="h-4 w-4"/> Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
