"use client"
import {Event} from "@prisma/client"
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useEffect, useState} from "react";
import {toast} from "@/hooks/use-toast";
import {Icons} from "@/components/icons";
import Confetti from "react-dom-confetti";
import {Textarea} from "@/components/ui/textarea";
import {formatDate} from "@/components/event-item";


interface EventProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}

type FormEventInvitationData = {
  name: string;
  message: string;
  status: string;
}


export function EventInvitation({event}: EventProps) {
  const {register, handleSubmit, watch, setValue} = useForm<FormEventInvitationData>({
    defaultValues: {
      name: "",
      message: "",
      status: "CONFIRMED",
    }
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();

  async function onSubmit(data: FormEventInvitationData) {
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
        description: "Sua confirmação não foi salva. Por favor tente novamente.",
        variant: "destructive",
      })
    }


    setSubmitted(true);
    localStorage.setItem('formEventInvitationSubmitted', 'true');

    if (data.status === "CONFIRMED") setShowConfetti(true);

    return (
      toast({
        description: "Sua confirmação foi salva.",
      })
    )
  }

  useEffect(() => {
    return () => {
      console.log(JSON.stringify(watch(), null, 2))
    };
  }, [watch]);


  if (submitted) {
    return (
      <section className="container mx-aut grid items-start">
        <Confetti
          config={{elementCount: 1000, spread: 360, duration: 5000}}
          active={true}/>
        <div className="mob:p-3 container mx-auto max-w-[570px] flex flex-col items-center gap-6 pt-6 pb-8 md:py-10">
          <h1
            className="mb-10 text-left text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-3xl">
            Obrigado!
          </h1>
          <h2
            className="mb-10 text-left max-w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            Sua confirmação foi salva.
          </h2>
        </div>
      </section>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-aut grid items-start">
      <section className="mob:p-3 container mx-auto max-w-[620px] flex flex-col items-center gap-6 pt-6 pb-8 md:py-10">
        <div
          id="form-event"
          className="container w-full flex flex-col items-center"
        >
          <h1
            className="mb-10 text-left text-xl font-extrabold leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-5xl">
            {event.title}
          </h1>
          <h2
            className="mb-10 text-left max-w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            Data: {formatDate(event.dateEvent.toString())}
          </h2>
          <h3
            className="mb-10 text-left break-words max-w-full text-xl font-extrabold leading-tight tracking-tighter sm:text-1xl md:text-2xl lg:text-3xl">
            Detalhes: {event.details}
          </h3>
          <h4
            className="mb-10 text-left max-w-full font-bold leading-tight tracking-tighter sm:text-base md:text-lg lg:text-xl">
            Preencha os campos abaixo
          </h4>
          <div className="grid w-full items-center gap-1.5">
            <Label>Seu nome</Label>
            <Input
              placeholder="Roger Rocha"
              {...register("name")}>

            </Input>
          </div>
          <div className="mt-8 grid w-full mob:w-full gap-1.5">
            <Label>Mensagem</Label>
            <Textarea
              placeholder="Vou levar pão de alho"
              {...register("message")}
            >
            </Textarea>
          </div>
          <div className="flex flex-row mt-8 p-5 gap-4">
            <Button type="button" size="lg" variant="green" onClick={() => setValue("status", "CONFIRMED")}>
              <Icons.party className="w-5 h-5 mr-3"></Icons.party> CONFIRMO
            </Button>
            <Button type="button" size="lg" variant="yellow" onClick={() => setValue("status", "UNCONFIRMED")}>
              <Icons.timer className="w-5 h-5 mr-3"></Icons.timer> INDECISO
            </Button>
            <Button type="button" size="lg" variant="destructive" onClick={() => setValue("status", "DECLINED")}>
              <Icons.close className="w-5 h-5 mr-3"></Icons.close> RECUSO
            </Button>
          </div>
          <Button type="submit" size="lg" className="mt-8">
            <Icons.archive className="w-5 h-5 mr-3"></Icons.archive> SALVAR
          </Button>
        </div>
      </section>
    </form>
  )
}
