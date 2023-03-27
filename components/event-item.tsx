import Link from "next/link"
import { Event } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {EventOperations} from "@/components/event-operations";

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
            Criado em {formatDate(event.createdAt?.toDateString())}
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
