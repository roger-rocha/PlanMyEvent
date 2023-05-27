import {siteConfig} from "@/config/site"
import {Icons} from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="container bg-white text-slate-600">
      <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-row items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Construido por{" "}
            <a
              href={siteConfig.links.site}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Roger Rocha.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
