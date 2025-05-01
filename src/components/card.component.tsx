import React from "react";
import Image from "next/image";
import { IEvent } from "@/interfaces/events.intervace";
import formatDate from "./dateformater";

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/api/event/', {
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

const EventCard = ({ name, start_date, price, path, id }: IEvent) => {
    console.log(start_date);

    const date = formatDate(start_date, false, true, false)
    const priceTag = Number(price) != 0 ? `Rp.${price}` : 'Free'

    return (
        <div className="bg-[#DBE2EF] rounded-2xl shadow-md overflow-hidden w-full max-w-xs">
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
            <div className="p-4 text-sm">
                <h3 className="font-semibold mb-1">{name}</h3>
                <p className="text-gray-600">{date}</p>
                <p className="mt-2 text-lg font-bold text-[#FBBC05]">{priceTag}</p>
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

