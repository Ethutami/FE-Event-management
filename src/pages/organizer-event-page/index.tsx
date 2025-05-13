'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';;
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { actionEventSearch } from '@/store/slice/eventSearchSlice';
import { IEvent } from '@/interfaces/events.interface';
import createDateFormatter from '@/components/dateformater';
import FilterSection from '@/pages/organizer-event-page/component/eventFilterSection.component';
import { checkEventStatus } from '@/components/checkEventStatus.component';

const EventCard = () => {
    const { events: searchEvent } = useAppSelector((state) => state?.eventsearchParamsReducers);
    const { events: filterStatus } = useAppSelector((state) => state?.eventStatusReducer);
    const [isSearching, setIsSearching] = useState(filterStatus?.length > 0);
    const dispatch = useAppDispatch()

    const events = isSearching ? filterStatus : searchEvent;

    useEffect(() => {
        dispatch(actionEventSearch({ organizer_id: 4 }))
    }, [dispatch])

    useEffect(() => {
        if (searchEvent?.length > 0) {
            setIsSearching(false);
        }
    }, [searchEvent]);

    useEffect(() => {
        if (filterStatus?.length > 0) {
            setIsSearching(true);
        }
    }, [filterStatus]);

    if (events) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mt-16">
                {events.map((event: IEvent) => {
                    const date = createDateFormatter(event?.end_date).includeWeekday().build()
                    const status = checkEventStatus(event?.start_date, event?.end_date)
                    return (
                        <div key={event?.id} className='rounded-2xl shadow-md bg-[#DBE2EF] overflow-hidden focus:outline-none transition-transform hover:scale-105'>
                            <Link href={`/dashboard/events/${event?.id}`}>
                                <div className="relative " >
                                    <Image src={event?.path} alt={event?.name} className="w-full h-40 object-cover rounded-t-2xl" height={100} width={100} />
                                    <span
                                        className={`absolute top-2 left-2 text-xs px-3 py-1 rounded-full font-semibold 
                                        ${status === "Up Coming" ? "bg-[#FBBC05]"
                                                : status === "On Going" ? "bg-[#2EC2A7]"
                                                    : status === "Expired" ? "bg-[#ee2737]" : ""
                                            }`}
                                    >
                                        {status}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-base font-semibold dark:text-[#112D4E]">{event?.name}</h3>
                                    <p className="text-sm dark:text-[#112D4E]">{event?.location}</p>
                                    <p className="text-sm text-[#ee2737] mb-6">Exp: {date}</p>
                                    <p className="text-right text-[#FBBC05] font-semibold">IDR {event?.price}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        );
    } else (<p> No Data Loaded</p>)
};

export default function EventOrganizerPage() {
    return (
        <div className='mt-16 px-20'>
            <FilterSection />
            <EventCard />
        </div>
    )
}