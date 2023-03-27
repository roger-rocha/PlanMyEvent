import { useDatePickerContext } from "@rehookify/datepicker"
import {ChevronLeft, ChevronsRight} from "lucide-react";

import { Button } from "./button"
import { getYearsClassName } from "./classnames-utils"
import { Section } from "./section"
import { SectionHeader } from "./section-header"

export const Years = () => {
  const {
    data: { years },
    propGetters: { previousYearsButton, nextYearsButton, yearButton },
  } = useDatePickerContext()

  return (
    <Section>
      <SectionHeader>
        <Button className="w-8" {...previousYearsButton()}>
          <ChevronLeft />
        </Button>
        <p className="text-center text-sm">
          {`${years[0].year} - ${years[years.length - 1].year}`}
        </p>
        <Button className="w-8" {...nextYearsButton()}>
          <ChevronsRight />
        </Button>
      </SectionHeader>
      <main className="grid grid-cols-3 items-center gap-2">
        {years.map((y) => (
          <Button
            key={y.$date.toString()}
            className={getYearsClassName("text-xs", y)}
            {...yearButton(y)}
          >
            {y.year}
          </Button>
        ))}
      </main>
    </Section>
  )
}
