"use client"
import { useEffect, useState } from "react";
import Image from "next/image"
import { useParams, useRouter } from "next/navigation";
import { eventApiService } from "@/services/eventApiService";
import { IUsers } from "@/interfaces/user.interface";
import { IEvent } from "@/interfaces/events.interface";
import ReviewCard from "@/pages/detail/component/reviewCard.componet";
import VoucherCard from "./component/voucher.component";
import createDateFormatter from "@/components/dateformater";

const CardTitle = (
    { name, users, price, date }
        : { name: string; users: IUsers; price: number, date: string }
) => {
    return (
        <div className="relative bg-[#F2F2F2] mt-4 p-6 md:p-16 lg:p-16 md:mt-16 lg:mt-16 md:rounded-lg lg:rounded-lg md:shadow-md lg:shadow-md flex justify-between items-center">
            <div className="hidden md:block lg:block absolute top-0 left-0 bg-[#3F72AF] text-md text-[#F9F7F7] px-8 py-4 rounded-md">
                <p>📅  {date}</p>
            </div>
            <div>
                <h3 className="text-3xl font-semibold text-[#112D4E]">{name}</h3>
                <p className="text-[#3F72AF] text-lg">{`Hosted by ${users?.first_name} ${users?.last_name}`}</p>
            </div>
            <div className="hidden md:block lg:block bg-[#DBE2EF] p-3 rounded-lg text-center">
                <div className="text-xl text-[#FBBC05] font-semibold mb-2">{`Rp. ${price}`}</div>
                <button className="bg-blue-900 text-2xl text-[#F9F7F7] px-4 py-1 rounded-md">
                    Buy Ticket
                </button>
            </div>
        </div>
    )
}
const BasicInfo = (
    { date, time, location, seats, description, price }
        : { date: string, time: string, location: string, seats: number, description: string, price: number, }
) => {
    return (
        <>
            {/* Versi untuk >=700px */}
            <div className="hidden md:block lg:block">
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
            </div>
            {/* Versi untuk <700px */}
            <div className="block md:hidden lg:hidden p-2 mt-10">
                <section className="mb-10">
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-4">
                            Description
                            <div className="h-[4px] w-10 bg-[#112D4E] dark:bg-[#FBBC05] rounded-lg"></div>
                        </h2>
                        <p className="text-gray-700 dark:text-white text-sm leading-relaxed">{description}</p>
                    </section>
                    <div className="space-y-6">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">📅</span>
                            <div>
                                <p className="font-semibold">Date</p>
                                <p>{date}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">⏰</span>
                            <div>
                                <p className="font-semibold">Time</p>
                                <p>{time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">📍</span>
                            <div>
                                <p className="font-semibold">Location</p>
                                <p>{location}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">💲</span>
                            <div>
                                <p className="font-semibold">Price</p>
                                <p>{price}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <button className="bg-[#112D4E] dark:bg-[#FBBC05] text-white px-10  py-2 rounded-lg font-semibold hover:bg-[#0b2242] transition">
                    Buy Tickets
                </button>
            </div>
        </>
    );
};

const DetailPage = () => {
    const [data, setData] = useState<IEvent>()
    const param = useParams()
    const router = useRouter();

    useEffect(() => {
        const api = eventApiService()
        async function fetchData() {
            const res = await api.fetchEventDetail(Number(param?.id))
            setData(res)
        }
        fetchData()
    }, [param])
    if (data) {
        const { name, users, price, start_date, location, remaining_seats, description } = data;
        const date = createDateFormatter(start_date).includeWeekday().build()
        const time = createDateFormatter(start_date).onlyTime().build()
        return (
            <div>
                {/* Versi untuk >=700px */}
                <div className="hidden md:block lg:block px-16 pb-16">
                    <div className="relative">
                        <button
                            onClick={router.back}
                            className="absolute top-0 left-10 z-11 items-center text-[#3F72AF] font-medium text-sm cursor-pointer mt-2"
                        >
                            ← Back
                        </button>
                        <Image src={data?.path || '/no-image.png'} alt="image" className="w-screen h-screen object-cover relative image " width={800} height={800} priority />
                    </div>
                    <VoucherCard />
                    <CardTitle name={data?.name} price={price} users={users} date={date} />
                    <BasicInfo date={date} time={time} location={location} seats={remaining_seats} description={description} price={price} />
                    <ReviewCard />
                </div>
                {/* Versi untuk <700px */}
                <div className="block md:hidden lg:hidden px-2 pb-16">
                    <button
                        onClick={router.back}
                        className="items-center text-[#3F72AF] font-medium text-sm cursor-pointer mt-2"
                    >
                        ← Back
                    </button>
                    <CardTitle name={name} price={price} users={users} date={date} />
                    <BasicInfo date={date} time={time} location={location} seats={remaining_seats} description={description} price={price} />
                    <VoucherCard />
                    <ReviewCard />
                </div>
            </div>
        )
    } else {
        <p>no data loaded </p>
    }

}

export default DetailPage
