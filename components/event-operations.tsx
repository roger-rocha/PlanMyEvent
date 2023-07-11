"use client"

import * as React from "react"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
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
import {cn} from "@/lib/utils";
import {format, subDays} from "date-fns";
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
import {useForm} from "react-hook-form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Overview} from "@/components/chart";
import {Visit} from "@/components/chart2";

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
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}

type FormEventData = {
  title: string;
  details: string;
  dateEvent: string;
}
//
// async function getTotalByDay(eventId: Event["id"], date: string): Promise<number> {
//   return db.eventParticipant.count({
//     where: {
//       eventId: eventId,
//       createdAt: {
//         gte: `${date}T00:00:00.000Z`,
//         lte: `${date}T23:59:59.999Z`,
//       }
//     },
//   });
// }
//
// async function getTotalByDayVisit(eventId: Event["id"], date: string): Promise<number> {
//   return db.eventVisit.count({
//     where: {
//       eventId: eventId,
//       createdAt: {
//         gte: `${date}T00:00:00.000Z`,
//         lte: `${date}T23:59:59.999Z`,
//       }
//     },
//   });
// }

export function EventOperations({event}: EventOperationsProps) {
  const {register, handleSubmit, setValue, watch} = useForm<FormEventData>({
    defaultValues: {
      title: event.title,
      details: event.details,
      dateEvent: event.dateEvent.toString()
    }
  });
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openRelatorio, setOpenRelatorio] = React.useState(false);
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

  const currentDate = new Date();

  const dataChart = [
    {
      name: format(subDays(currentDate, 6), 'dd/MM'),
      total: 12
    },
    {
      name: format(subDays(currentDate, 5), 'dd/MM'),
      total: 10
    },
    {
      name: format(subDays(currentDate, 4), 'dd/MM'),
      total: 5
    },
    {
      name: format(subDays(currentDate, 3), 'dd/MM'),
      total: 6
    },
    {
      name: format(subDays(currentDate, 2), 'dd/MM'),
      total: 2
    },
    {
      name: format(subDays(currentDate, 1), 'dd/MM'),
      total: 0
    },
    {
      name: format(currentDate, 'dd/MM'),
      total: 3
    }
  ];

  const dataChartVisit = [
    {
      name: format(subDays(currentDate, 6), 'dd/MM'),
      total: 4
    },
    {
      name: format(subDays(currentDate, 5), 'dd/MM'),
      total: 5
    },
    {
      name: format(subDays(currentDate, 4), 'dd/MM'),
      total: 9
    },
    {
      name: format(subDays(currentDate, 3), 'dd/MM'),
      total: 10
    },
    {
      name: format(subDays(currentDate, 2), 'dd/MM'),
      total: 2
    },
    {
      name: format(subDays(currentDate, 1), 'dd/MM'),
      total: 0
    },
    {
      name: format(currentDate, 'dd/MM'),
      total: 0
    }
  ];


  const copyEventLink = (link: string) => {
    navigator.clipboard.writeText(`https://plan-my-event.vercel.app/event/participant/${link}`);
    toast({
      description: "Link do evento foi copiado.",
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
      <div className="flex flex-row flex-nowrap">
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipContent>Ver Relatório</TooltipContent>
              <Dialog open={openRelatorio} onOpenChange={setOpenRelatorio}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icons.report className="h-4 w-4"></Icons.report>
                  </Button>
                </DialogTrigger>
                <DialogContent className={"sm:max-w-[1000px] max-h-[700px] sm:overflow-auto"}>
                  <DialogHeader>
                    <DialogTitle>Relatório do Evento</DialogTitle>
                    <DialogDescription>Todas as estasticas e informações do seu evento.</DialogDescription>
                  </DialogHeader>
                  <div className={"grid grid-cols-2 gap-4 mt-5"}>
                    <Card className="h-[100px] border-t-purple-300 border-t-4 ring-gray-200 shadow ring-1 ">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                          Total
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-row">
                        <Icons.database className="h-8 w-8 p-1  mr-3 bg-purple-300 text-purple-800 rounded-lg"/>
                        <div className="text-2xl font-bold">128</div>
                      </CardContent>
                    </Card>
                    <Card className="h-[100px] border-t-emerald-300 border-t-4 ring-gray-200 shadow ring-1 ">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                          Confirmados
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-row">
                        <Icons.checkCircle className="h-8 w-8 p-1  mr-3 bg-emerald-300 text-green-800 rounded-lg"/>
                        <div className="text-2xl font-bold">128</div>
                      </CardContent>
                    </Card>
                    <Card className="h-[100px] border-t-amber-400 border-t-4">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">
                          Indefinidos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-row">
                        <Icons.help className="bg-amber-400 text-yellow-800 h-8 w-8 p-1  mr-3 rounded-lg"/>
                        <div className="text-2xl font-bold">40</div>
                      </CardContent>
                    </Card>
                    <Card className="h-[100px]  border-t-red-400 border-t-4">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-md font-medium">Recusados</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-row">
                        <Icons.xCircle className="bg-red-400 text-red-800 h-8 w-8 p-1 rounded-lg mr-3 "/>
                        <div className="text-2xl font-bold">23</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className={"grid sm:grid-cols-2 gap-4 mt-5"}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Registros</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Overview event={dataChart}/>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Visitas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Visit event={dataChartVisit}/>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
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

    </>
  )
}
