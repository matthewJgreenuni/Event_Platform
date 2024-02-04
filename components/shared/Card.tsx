import { IEvent } from "@/lib/database/models/event.model"
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirm from "./DeleteConfirm";

interface CardProps {
    event: IEvent;
    hasOrder?: boolean
    hidePrice?: boolean
}

export default function Card({ event, hasOrder, hidePrice }: CardProps){
    //gets logged in user details
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const isEventCreator = userId === event.organizer._id.toString();
    return(
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
        <Link 
          href={`/events/${event._id}`}
          style={{backgroundImage: `url(${event.imageUrl})`}}
          className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
        />
        {isEventCreator && !hidePrice && (
            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                <Link href={`/events/${event._id}/update`}>
                    <Image src='/assets/icons/edit.svg' alt="edit" width={20} height={20} />
                </Link>
                <DeleteConfirm eventId={event._id} />
            </div>
        )}

        <div className="flex min-h-[230px] flex-col gap-3 p-4 md:gap-4">
            {!hidePrice && <div className="flex gap-2">
                <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">{event.isFree? 'Free' : `£${event.price}`}</span>
                <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">{event.category.name}</p>
            </div>}

            <p className="p-medium-16 p-medium-18 text-grey-500">{formatDateTime(event.startDateTime).dateTime}</p>
            <Link href={`/events/${event._id}`}>
                <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>
            </Link>

            <div className="flex-between w-full">
                <p className="p-medium-14 md:p-medium-16 text-grey-600">{event.organizer.firstName} {event.organizer.lastName}</p>

                {hasOrder && (
                    <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
                        <p className="text-primary-500">Order Details</p>
                        <Image src='/assets/icons/arrow.svg' alt="Search" width={10} height={10} />
                    </Link>
                )}
            </div>

        </div>
        </div>
    )
}