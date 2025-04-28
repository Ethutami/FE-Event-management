'use client'
import { useEffect, useState } from "react";
import Image from "next/image"
import { IEvent, } from "@/interfaces/events.intervace";
import formatDate from "@/components/dateformater";
import VoucherCard from "@/components/voucher.component";
import ReviewCard from "@/components/reviewCard.componet";
import { IReview } from "@/interfaces/review.interface";
import { IUsers } from "@/interfaces/user.interface";

const CardTitle = (
    { name, users, price, date }
        : { name: string; users: IUsers; price: string, date: string }
) => {
    return (
        <div className="relative bg-[#F2F2F2] p-16 mt-16 rounded-lg shadow-md flex justify-between items-center">
            <div className="absolute top-0 left-0 bg-[#3F72AF] text-md text-[#F9F7F7] px-8 py-4 rounded-md">
                <p>📅  {date}</p>
            </div>
            <div>
                <h3 className="text-3xl font-semibold text-[#112D4E]">{name}</h3>
                <p className="text-[#3F72AF] text-lg">{`Hosted by ${users.first_name} ${users.last_name}`}</p>
            </div>
            <div className="bg-[#DBE2EF] p-3 rounded-lg text-center">
                <div className="text-xl text-orange-500 font-semibold mb-2">{`Rp. ${price}`}</div>
                <button className="bg-blue-900 text-2xl text-[#F9F7F7] px-4 py-1 rounded-md">
                    Buy Ticket
                </button>
            </div>
        </div>
    )
}
const BasicInfo = (
    { date, time, location, seats, description }
        : { date: string, time: string, location: string, seats: number, description: string }
) => {
    return (
        <>
            <div className="p-10 bg-[#F2F2F2] rounded-t-lg shadow-md mt-16 text-[#112D4E] ">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Basic Info</h1>
                    <div className="h-[6px] w-30 bg-[#112D4E] rounded-lg"></div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <h3 className="text-sm font-semibold  mb-2">📅 Date</h3>
                        <p>{date}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-2">🕒Time</h3>
                        <p>{time}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-2">📍 Location</h3>
                        <div>
                            <p className="font-medium">{location}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-2">Seats</h3>
                        <div>
                            <h3 className="text-4xl font-bold text-[#112D4E]">{seats}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-10 bg-[#F2F2F2] rounded-b-lg shadow-md text-[#112D4E] ">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Description</h1>
                    <div className="h-[6px] w-30 bg-[#112D4E] rounded-lg"></div>
                </div>
                <p>{description}</p>
            </div>
        </>
    );
};

const DetailPage = () => {
    const [data, setData] = useState<IEvent>()
    const [reviews, setReviews] = useState<IReview[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8000/api/event/detail/65', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data?.data)
                setLoading(false)
            })
    }, [data])
    useEffect(() => {
        fetch('http://localhost:8000/api/review/event/65', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setReviews(data?.data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    const { name, users, price, start_date, location, remaining_seats, description } = data
    const date = formatDate(start_date, true, false, false)
    const time = formatDate(start_date, false, false, true)

    return (
        <div className="px-16 pb-16">
            <Image src={data?.path} alt="image" className="w-screen h-screen object-cover" width={800} height={800} />
            <VoucherCard />
            <CardTitle name={name} price={price} users={users} date={date} />
            <BasicInfo date={date} time={time} location={location} seats={remaining_seats} description={description} />
            <ReviewCard params={reviews ?? []} />
        </div>
    )
}

export default DetailPage