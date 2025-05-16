import { Suspense } from "react";
import { EventDetails } from "../component/detail";

export default function EventOrganizerDetailPage() {
    return (
        <Suspense>
            <div className='mt-16 px-20'>
                <EventDetails />
            </div>
        </Suspense>
    )
}