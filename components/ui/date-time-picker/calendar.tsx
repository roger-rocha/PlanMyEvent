import { FC, ReactNode } from "react"
import {
  Calendar as CalendarType,
  useContextCalendars,
  useContextDaysPropGetters,
} from "@rehookify/datepicker"

import { Button } from "./button"
import { getDayClassName } from "./classnames-utils"
import { Section } from "./section"
import { SectionHeader } from "./section-header"

//import "./calendar.css"

interface CalendarProps {
  prevButton?: ReactNode
  nextButton?: ReactNode
  calendar: CalendarType
}

export const Calendar: FC<CalendarProps> = ({
  prevButton,
  nextButton,
  calendar,
}) => {
  const { weekDays } = useContextCalendars()
  const { dayButton } = useContextDaysPropGetters()
  const { days, month } = calendar

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <Section className="w-full">
      <SectionHeader>
        {prevButton || <div />}
        <p className="text-md grow-0 text-center">{capitalizeFirstLetter(month)}</p>
        {nextButton || <div />}
      </SectionHeader>
      <div className="mb-2 grid h-8 grid-cols-7 items-center gap-y-5 gap-x-10">
        {weekDays.map((d) => (
          <p className="mr-3 text-center text-xs">{capitalizeFirstLetter(d)}</p>
        ))}
      </div>
      <main className="mr-3 grid grid-cols-7 gap-y-5 gap-x-10">
        {days.map((d) => (
          <Button
            key={d.$date.toString()}
            className={getDayClassName("w-8 mr-3 text-xs", d)}
            {...dayButton(d)}
          >
            {d.day}
          </Button>
        ))}
      </main>
    </Section>
  )
}
