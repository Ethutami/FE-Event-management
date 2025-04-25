import React from "react";
import Image from "next/image";
import { IEvent } from "@/interfaces/events.intervace";

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8000/api/event/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data?.data;

    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

const DateConvert = (s: string): [string, string] => {
    const d = new Date(s);

    const date = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(d);

    const time = new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(d);

    return [date, time];
};

const EventCard = ({ name, start_date, price, path, id }: IEvent) => {
    const [date, time] = DateConvert(start_date)
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-xs">
            <div className="relative h-40 w-full">
                <Image
                    src={path || '/no-image.png'}
                    alt={name}
                    fill
                    className="rounded-t-2xl"
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
            </div>
            <div className="p-4 bg-blue-50 text-sm">
                <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
                <p className="text-gray-600">{`${date} | ${time}`}</p>
                <p className="mt-2 text-lg font-bold text-gray-800">{price}</p>
                {id && (
                    <button className="button mt-3 px-4 py-1 rounded-md text-[#F9F7F7]">Book</button>
                )}
            </div>
        </div>
    )
};

const CardComponent = async () => {
    const events = await fetchData()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-16">
            {events.map((event: IEvent) => (
                <EventCard key={event.id} {...event} id={event.id} />
            ))}
        </div>
    );
}

export default CardComponent

