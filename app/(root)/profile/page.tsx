import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function ProfilePage(){
    const { sessionClaims } = auth()
    const userId = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({userId, page: 1})
    return(
        <>
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
                <Button asChild className="button hidden sm:flex" size='lg'>
                    <Link href='/#events'>Explore more Events</Link>
                </Button>
            </div>
        </section>
        {/* <section className="wrapper my-8">
            <Collection
            data={events?.data}
            emptyTitle='No Event Tickets'
            emptyStateSubtext = 'buy some brokie'
            collectionType='My_Tickets'
            limit={3}
            page={1}
            totalPages={2}
            urlParamName="ordersPage"
            />
        </section> */}

        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
                <Button asChild className="button hidden sm:flex" size='lg'>
                    <Link href='/events/create'>Create new Event</Link>
                </Button>
            </div>
        </section>
        <section className="wrapper my-8">
            <Collection
            data={organizedEvents?.data}
            emptyTitle='No Event Created'
            emptyStateSubtext = 'Go make some'
            collectionType='Events_Organized'
            limit={3}
            page={1}
            totalPages={2}
            urlParamName="eventsPage"
            />
        </section>
        
        
        </>
    )
}