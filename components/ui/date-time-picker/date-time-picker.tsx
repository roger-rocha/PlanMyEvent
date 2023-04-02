import {
  useContextCalendars,
  useContextDays,
  useContextMonthsPropGetters,
} from "@rehookify/datepicker"
import {ChevronLeft, ChevronRight} from "lucide-react";

import { Button, Calendar, Time } from "./"

export function Root() {
  const { calendars } = useContextCalendars()
  const { formattedDates } = useContextDays()
  const { previousMonthButton, nextMonthButton } = useContextMonthsPropGetters()

  return (
    <div>
      <h2 className="mob:text-xl mob:w-full mt-3 mb-6 w-full text-center font-bold leading-tight">
        {formattedDates[formattedDates.length - 1]}
      </h2>
      <main className="h-82 mb-4 flex w-full items-center">
        <div className="h-400 shadow-xs w-4/5 rounded border border-slate-300 p-4 shadow shadow-slate-300">
          <Calendar
            prevButton={
              <Button className=" w-8 grow" {...previousMonthButton()}>
                <ChevronLeft />
              </Button>
            }
            nextButton={
              <Button className="w-8 grow" {...nextMonthButton()}>
                <ChevronRight />
              </Button>
            }
            calendar={calendars[0]}
          />
        </div>
        <div className="shadow-xs scrollbar-hide w-2/7 ml-2 h-full rounded border border-slate-300 p-4 shadow shadow-slate-300">
          <Time />
        </div>
      </main>
    </div>
  )
}
