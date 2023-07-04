import Link from "next/link"
import {Event} from "@prisma/client"
import {Skeleton} from "@/components/ui/skeleton"
import {EventOperations} from "@/components/event-operations";

interface EventItemProps {
  event: Pick<Event, "id" | "title" | "details" | "dateEvent" | "createdAt">
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/event/report/${event.id}`}
          className="font-semibold hover:underline"
        >
          {event.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
           {formatDate(event.dateEvent.toString())}
          </p>
        </div>
      </div>
      <EventOperations event={{ id: event.id, title: event.title, details: event.details, dateEvent: event.dateEvent }} />
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
