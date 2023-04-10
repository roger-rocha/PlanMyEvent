import Link from "next/link"
import {Event} from "@prisma/client"
import {Skeleton} from "@/components/ui/skeleton"
import {EventOperations} from "@/components/event-operations";
import {format} from "date-fns";

interface EventItemProps {
  event: Pick<Event, "id" | "title" | "dateEvent" | "createdAt">
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/event/${event.id}`}
          className="font-semibold hover:underline"
        >
          {event.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            Agendado para {format(event.dateEvent, "dd/MM/Y H:mm")}
          </p>
        </div>
      </div>
      <EventOperations event={{ id: event.id, title: event.title }} />
    </div>
  )
}

EventItem.Skeleton = function EventItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
