import { useDatePickerContext } from "@rehookify/datepicker"
import {ChevronRight, ChevronLeft} from "lucide-react";
import { Button } from "./button"
import { getMonthClassName } from "./classnames-utils"
import { Section } from "./section"
import { SectionHeader } from "./section-header"

export const Months = () => {
  const {
    data: { months },
    propGetters: { previousMonthButton, nextMonthButton, monthButton },
  } = useDatePickerContext()

  const year = months[0].$date.getFullYear()

  return (
    <Section>
      <SectionHeader>
        <Button className="w-8" {...previousMonthButton()}>
          <ChevronLeft />
        </Button>
        <p className="text-center text-sm">{year}</p>
        <Button className="w-8" {...nextMonthButton()}>
          <ChevronRight />
        </Button>
      </SectionHeader>
      <main className="grid grid-cols-3 items-center gap-2">
        {months.map((m) => (
          <Button
            key={m.month + year}
            className={getMonthClassName("text-xs", m)}
            {...monthButton(m)}
          >
            {m.month}
          </Button>
        ))}
      </main>
    </Section>
  )
}
