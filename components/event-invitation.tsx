"use client"
import {Event} from ".prisma/client"
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
import {Metadata} from "next";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";


interface EventProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}

type FormEventInvitationData = {
  name: string;
  message: string;
  status: string;
}

export const metadata: Metadata = {
  title: "Convite",
  description: "Você foi convidado para um evento.",
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
    if(!data.name) {
        return toast({
            title: "Por favor, informe seu nome.",
            variant: "destructive",
        })
    }

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
      <section className="mob:w-full  mob:min-h-screen overflow-hidden">
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
    <form onSubmit={handleSubmit(onSubmit)}>

      <section className="mob:w-full  mob:min-h-screen overflow-hidden">
        <Card className="max-w-lg mob:w-full mob:min-h-screen overflow-hidden">
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl mob:text-xl font-extrabold">{event.title}</h1>
            </CardTitle>

            <CardDescription>

              <h2 className="text-lg font-extrabold"> Data: {formatDate(event.dateEvent.toString())}</h2>
              <h3 className="text-lg font-extrabold"> Detalhes: {event.details}</h3>

            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-full grid gap-4">
              <h4 className="font-bold">Preencha os campos abaixo</h4>
              <div className="grid gap-2">
                <Label>Seu nome</Label>
                <Input
                  placeholder="Roger Rocha"
                  {...register("name")}>
                </Input>
              </div>

              <div className="grid gap-2">
                <Label>Mensagem</Label>
                <Textarea
                  placeholder="Vou levar pão de alho"
                  {...register("message")}
                >
                </Textarea>
              </div>

              <div className="grid gap-4 mt-3">
                <Button type="button" variant="green" onClick={() => setValue("status", "CONFIRMED")}>
                  <Icons.party className="w-5 h-5 mr-3"></Icons.party> Confirmar
                </Button>
                <Button type="button"  variant="yellow" onClick={() => setValue("status", "UNCONFIRMED")}>
                  <Icons.timer className="w-5 h-5 mr-3"></Icons.timer> Aguardar
                </Button>
                <Button type="button" variant="destructive" onClick={() => setValue("status", "DECLINED")}>
                  <Icons.close className="w-5 h-5 mr-3"></Icons.close> Recusar
                </Button>
              </div>

          </CardContent>
          <CardFooter className="w-full mt-8">
            <Button type="submit" className="w-full">
              <Icons.send className="w-5 h-5 mr-3"></Icons.send> Responder
            </Button>
          </CardFooter>
        </Card>
      </section>
    </form>
  )
}
