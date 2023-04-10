"use client"
import {Event} from "@prisma/client"
import * as z from "zod";
import {postPatchEventInvitationSchema, postPatchSchema} from "@/lib/validations/post";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useEffect, useState} from "react";
import {toast} from "@/hooks/use-toast";
import {Icons} from "@/components/icons";
import {format} from "date-fns";


interface EventProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}

type FormEventInvitationData = z.infer<typeof postPatchEventInvitationSchema>

export function EventInvitation({event}: EventProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormEventInvitationData>({
    resolver: zodResolver(postPatchSchema),
  })
  const [status, setStatus] = useState<FormEventInvitationData["status"]>("CONFIRMED");
  const router = useRouter()

  useEffect(() => {
    return () => {
      setValue("status", status)
    };
  }, [status]);


  async function onSubmit(data: FormEventInvitationData) {
    console.log(data)
    const response = await fetch(`/api/invitation/${event.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        message: data.message,
        status: data.status,
      }),
    })

    if (!response?.ok) {
      return toast({
        title: "Aconteceu um imprevisto.",
        description: "Sua confirmação não foi salvo. Por favor tente novamente.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Sua confirmação foi salva.",
    })
  }

  useEffect(() => {
    return () => {
      console.log(JSON.stringify(watch(), null, 2))
    };
  }, [watch()]);

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mob:p-3 flex flex-col items-center gap-6 pt-6 pb-8 md:py-10">
        <div
          id="form-event"
          className="flex max-w-[800px] flex-col items-center"
        >
          <h1 className="mb-10 text-center text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Seu convite para {event.title}
          </h1>
          <h2 className="mb-10 text-center text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            Data: {format(new Date(event.dateEvent), "dd/MM/Y H:mm")}
          </h2>
          <h3 className="mb-10 text-center text-xl font-extrabold leading-tight tracking-tighter sm:text-1xl md:text-2xl lg:text-3xl">
            Detalhes: {event.details}
          </h3>
          <h4 className="mb-10 text-center text-xl font-bold leading-tight tracking-tighter sm:text-1xl md:text-2xl lg:text-3xl">
            Preencha os campos abaixo para confirmar a sua resposta
          </h4>
          <div className="grid w-4/5 items-center gap-1.5">
            <Label>Seu nome</Label>
            <Input
              required={true}
              placeholder="Roger Rocha"
              {...register("name")}>

            </Input>
          </div>
          <div className="mt-8 grid w-4/5 gap-1.5">
            <Label>Mensagem</Label>
            <Input
              placeholder="Vou levar pão de alho"
              {...register("message")}
            >
            </Input>
          </div>
          <div className="mt-8">
            <div className="flex flex-row p-5 gap-5">
              <Button type="button" size="lg" variant="green" onClick={() => setStatus("CONFIRMED")}>
                <Icons.party className="w-5 h-5 mr-3"></Icons.party> CONFIRMO
              </Button>
              <Button type="button" size="lg" variant="yellow" onClick={() => setStatus("UNCONFIRMED")}>
                <Icons.timer className="w-5 h-5 mr-3"></Icons.timer> INDECISO
              </Button>
              <Button type="button" size="lg" variant="destructive" onClick={() => setStatus("DECLINED")}>
                <Icons.close className="w-5 h-5 mr-3"></Icons.close> RECUSO
              </Button>
            </div>
          </div>
          <Button type="submit" className="mt-8">
            <Icons.archive className="w-4 h-4 mr-1"></Icons.archive> Salvar
          </Button>
        </div>
      </section>
    </form>
  )
}
