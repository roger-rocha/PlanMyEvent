import * as React from "react"
import {Event} from "@prisma/client"
import {EditAction} from "@/components/eventActions/edit";
import {ShareAction} from "@/components/eventActions/share";
import {ReportAction} from "@/components/eventActions/report";
import {DeleteAction} from "@/components/eventActions/delete";

export const time = [
  {time: "00:00", label: "00:00"},
  {time: "00:30", label: "00:30"},
  {time: "01:00", label: "01:00"},
  {time: "01:30", label: "01:30"},
  {time: "02:00", label: "02:00"},
  {time: "02:30", label: "02:30"},
  {time: "03:00", label: "03:00"},
  {time: "03:30", label: "03:30"},
  {time: "04:00", label: "04:00"},
  {time: "04:30", label: "04:30"},
  {time: "05:00", label: "05:00"},
  {time: "05:30", label: "05:30"},
  {time: "06:00", label: "06:00"},
  {time: "06:30", label: "06:30"},
  {time: "07:00", label: "07:00"},
  {time: "07:30", label: "07:30"},
  {time: "08:00", label: "08:00"},
  {time: "08:30", label: "08:30"},
  {time: "09:00", label: "09:00"},
  {time: "09:30", label: "09:30"},
  {time: "10:00", label: "10:00"},
  {time: "10:30", label: "10:30"},
  {time: "11:00", label: "11:00"},
  {time: "11:30", label: "11:30"},
  {time: "12:00", label: "12:00"},
  {time: "12:30", label: "12:30"},
  {time: "13:00", label: "13:00"},
  {time: "13:30", label: "13:30"},
  {time: "14:00", label: "14:00"},
  {time: "14:30", label: "14:30"},
  {time: "15:00", label: "15:00"},
  {time: "15:30", label: "15:30"},
  {time: "16:00", label: "16:00"},
  {time: "16:30", label: "16:30"},
  {time: "17:00", label: "17:00"},
  {time: "17:30", label: "17:30"},
  {time: "18:00", label: "18:00"},
  {time: "18:30", label: "18:30"},
  {time: "19:00", label: "19:00"},
  {time: "19:30", label: "19:30"},
  {time: "20:00", label: "20:00"},
  {time: "20:30", label: "20:30"},
  {time: "21:00", label: "21:00"},
  {time: "21:30", label: "21:30"},
  {time: "22:00", label: "22:00"},
  {time: "22:30", label: "22:30"},
  {time: "23:00", label: "23:00"},
  {time: "23:30", label: "23:30"},
];

export interface EventOperationsProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent">
}

export type FormEventData = {
  title: string;
  details: string;
  dateEvent: string;
}


export function EventOperations({event}: EventOperationsProps) {

  return (
    <>
      <div className="flex flex-row flex-nowrap">
        <EditAction event={event}/>
        <ShareAction event={event}/>
        <ReportAction event={event}/>
        <DeleteAction event={event}/>
      </div>
    </>
  )
}
