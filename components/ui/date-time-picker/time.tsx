import {
  useContextTime,
  useContextTimePropGetters,
} from "@rehookify/datepicker"

import { Button } from "./button"
import { getTimesClassName } from "./classnames-utils"

export const Time = () => {
  const { time } = useContextTime()
  const { timeButton } = useContextTimePropGetters()
  return (
    <ul className="scrollbar-hide m-0 max-h-80 list-none overflow-y-auto p-0">
      {time.map((t) => (
        <li
          key={t.$date.toString()}
          className="flex flex-col justify-center p-0"
        >
          <Button
            className={getTimesClassName("text-xs px-8", t)}
            {...timeButton(t)}
          >
            {t.time}
          </Button>
        </li>
      ))}
    </ul>
  )
}
