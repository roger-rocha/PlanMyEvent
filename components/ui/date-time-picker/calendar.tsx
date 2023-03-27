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
  return (
    <Section>
      <SectionHeader>
        {prevButton || <div />}
        <p className="text-center text-sm">{month}</p>
        {nextButton || <div />}
      </SectionHeader>
      <div className="mb-2 grid h-8 grid-cols-7 items-center gap-y-2">
        {weekDays.map((d) => (
          <p className="text-center text-xs">{d}</p>
        ))}
      </div>
      <main className="grid grid-cols-7 gap-y-2">
        {days.map((d) => (
          <Button
            key={d.$date.toString()}
            className={getDayClassName("w-8 text-xs", d)}
            {...dayButton(d)}
          >
            {d.day}
          </Button>
        ))}
      </main>
    </Section>
  )
}
