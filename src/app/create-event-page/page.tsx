import { Suspense } from "react";
import { EventDetails } from "../organizer-event-detail-page/component/detail";

export default function CreateNewEvent() {
    return (
        <Suspense>
            <div className='mt-16 px-20'>
                <EventDetails />
            </div>
        </Suspense>
    )
}