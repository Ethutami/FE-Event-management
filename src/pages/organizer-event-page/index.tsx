'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';;
import Link from 'next/link';
import { eventApiService } from '@/services/eventApiService';
import { IEvent } from '@/interfaces/events.interface';
import createDateFormatter from '@/components/dateformater';
import checkEventStatus from '@/components/checkEventStatus.component';
import FilterSection from '@/components/eventFilterSection.component';

const EventCard = () => {
    const [data, setData] = useState<IEvent[]>([])
    useEffect(() => {
        const api = eventApiService()
        async function getData() {
            const res = await api.searchEvents({ organizer_id: 4 })
            setData(res)
        }
        getData()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mt-16">
            {data.map((event: IEvent) => {
                const date = createDateFormatter(event?.end_date).includeWeekday().build()
                const status = checkEventStatus(event?.start_date, event?.end_date)
                return (
                    <div key={event?.id} className='rounded-2xl shadow-md bg-[#DBE2EF] overflow-hidden focus:outline-none transition-transform hover:scale-105'>
                        <Link href={`/organizer-event-detail/${event?.id}`}>
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
                                <h3 className="text-base font-semibold">{event?.name}</h3>
                                <p className="text-sm ">{event?.location}</p>
                                <p className="text-sm text-[#ee2737] mb-6">Exp: {date}</p>
                                <p className="text-right text-[#FBBC05] font-semibold">IDR {event?.price}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
};

export default function EventOrganizerPage() {
    return (
        <div className='mt-16 px-20'>
            <FilterSection />
            <EventCard />
        </div>
    )
}