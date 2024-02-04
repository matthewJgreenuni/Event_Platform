//this will have stripe functions, which i cant imaagine ill use in near future

import { IEvent } from "@/lib/database/models/event.model"
import { Button } from "../ui/button"

export default function Checkout({ event, userId}: { event: IEvent, userId: string }){
  const onCheckout = async() => {
    console.log("checkouted")
  }


  return(
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size='lg' className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  )
}