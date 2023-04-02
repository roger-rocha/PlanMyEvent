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
    <ul className="m-0 max-h-80 list-none overflow-y-auto scrollbar-none">
      {time.map((t) => (
        <li
          key={t.$date.toString()}
          className="flex flex-col justify-center p-0 pt-2"
        >
          <Button
            className={getTimesClassName("text-lg px-10", t)}
            {...timeButton(t)}
          >
            {t.time}
          </Button>
        </li>
      ))}
    </ul>
  )
}
