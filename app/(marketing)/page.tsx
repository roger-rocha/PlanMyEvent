import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import hero2 from "../../public/images/hero5.svg"

export default async function IndexPage() {
  return (
    <>
      <section className="container flex flex-col items-center justify-center gap-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
        <div className="mx-auto flex flex-col items-center gap-4 text-center lg:w-[52rem]">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
            Crie e Gerencie o seu evento <br className="hidden sm:inline" />  Em apenas um lugar só.
          </h1>
          <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
            Monte sua festa conforme seu gosto e envie o convite-link para seus
            convidados confirmarem presença!
          </p>
        </div>
        <Image src={hero2} width={500} height={300} alt="Hero image" priority />
        <div className="flex gap-4">
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Crie seu Evento
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Entrar em um evento
          </Link>
        </div>
      </section>
    </>
  )
}
