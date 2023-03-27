import {
  useContextCalendars,
  useContextDays,
  useContextMonthsPropGetters,
} from "@rehookify/datepicker"
import {ChevronLeft, ChevronsRight} from "lucide-react";

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
      <main className="mb-4 flex w-full items-center">
        <div className="h-82 shadow-xs w-3/5 rounded border border-slate-300 p-4 shadow shadow-slate-300">
          <Calendar
            prevButton={
              <Button className="w-8" {...previousMonthButton()}>
                <ChevronLeft />
              </Button>
            }
            nextButton={
              <Button className="w-8" {...nextMonthButton()}>
                <ChevronsRight />
              </Button>
            }
            calendar={calendars[0]}
          />
        </div>
        <div className="h-82 shadow-xs scrollbar-hide ml-2 w-2/5 rounded border border-slate-300 p-4 shadow shadow-slate-300">
          <Time />
        </div>
      </main>
    </div>
  )
}
