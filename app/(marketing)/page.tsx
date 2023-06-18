import Image from "next/image"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import hero2 from "../../public/new-year-celebration.svg"
import {BarChart4, FileDownIcon, QrCodeIcon, RocketIcon, SmartphoneIcon, WalletIcon} from "lucide-react";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Crie, Planeje e Gerencie o seu evento com facilidade.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Monte sua festa conforme seu gosto e envie o convite para seus
            convidados confirmarem presença!
          </p>
          <Image src={hero2} width={450} height={450} alt="Hero image" priority />
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Criar Evento
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Plan My Event
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Esta ferramenta foi projeta para auxiliar você a planejar e gerenciar uma festa, evento ou confraternização.
            Confira alguma das features que o nosso serviço vai te entregar.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
              >
                <path d="M5.083 18.333q-.729 0-1.239-.521-.511-.52-.511-1.25V8.417q0-.729.511-1.24.51-.51 1.239-.51h.709V5.042q0-1.771 1.218-2.99Q8.229.833 10 .833q1.771 0 2.99 1.219 1.218 1.219 1.218 2.99v1.625h.709q.729 0 1.239.51.511.511.511 1.24v8.145q0 .73-.511 1.25-.51.521-1.239.521ZM7.542 6.667h4.916V5.042q0-1.021-.718-1.74-.719-.719-1.74-.719t-1.74.719q-.718.719-.718 1.74Zm-2.459 9.916h9.834V8.417H5.083v8.166Zm0-8.166v8.166-8.166ZM10 15.812q.354 0 .615-.26.26-.26.26-.614v-1.584h1.583q.354 0 .615-.26.26-.261.26-.615t-.26-.614q-.261-.261-.615-.261h-1.583v-1.583q0-.354-.26-.615-.261-.26-.615-.26t-.615.26q-.26.261-.26.615v1.583H7.542q-.354 0-.615.261-.26.26-.26.614t.26.615q.261.26.615.26h1.583v1.584q0 .354.26.614.261.26.615.26Z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Login Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Não precisa de senha, use o email ou uma conta do google para entrar.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <QrCodeIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Qr Code Convite</h3>
                <p className="text-sm">
                  Você pode compartilhar o convite com seus amigos através de QR Code.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BarChart4 className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Relatório</h3>
                <p className="text-sm text-muted-foreground">
                  Você pode gerenciar seu evento através de um relatório detalhado.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <SmartphoneIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Multi device</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse o seu evento de qualquer dispositivo a qualquer momento.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
             <FileDownIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Exporte dados</h3>
                <p className="text-sm text-muted-foreground">
                  Exporte os dados do seu evento para uma planilha.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <WalletIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Assinaturas</h3>
                <p className="text-sm text-muted-foreground">
                  Temos planos gratuitos e pagos, escolha o que melhor para você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-2xl leading-[1.1] sm:text-2xl md:text-5xl">
            Queremos fazer parte da sua festa!
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Esse é projeto feito pensando em resolver um problema comum organizar festas e eventos. <br />{" "}
            Uma opção mais elegante, organizada e especial do que criar um grupo no whatsapp.
          </p>
          <div className="space-x-4m mt-1.5">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              <RocketIcon className={"h-4 w-4 mr-1.5"}/>Quero criar meu evento
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
