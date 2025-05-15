'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { reviewApiService } from "@/services/reviewApiService";
import { IReview } from "@/interfaces/review.interface";
import createDateFormatter from "@/components/dateformater";
import { IMAGE_URL } from "@/config";

const ReviewCard = () => {
    const [reviews, setReviews] = useState<IReview[]>([])
    const param = useParams()

    useEffect(() => {
        const api = reviewApiService()
        async function fetchData() {
            const res = await api.fetchEventReview(Number(param?.id))
            setReviews(res)
        }
        fetchData()
    }, [param])

    if (!reviews || reviews.length === 0) {
        return <div className="mt-24 w-fit mx-auto p-6">There is no review yet</div>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 single-grid">
            {reviews.map((review: IReview, index: number) => {
                const date = createDateFormatter(review?.created_at).onlyTime().build()
                const userName = review?.users?.first_name + ' ' + review?.users?.last_name
                return (
                    <div
                        key={index}
                        className={`p-6 mt-8 rounded-lg shadow-md bg-white review-card ${index % 2 === 0 ? 'left-align' : 'right-align'
                            }`}
                    >
                        {/* Versi untuk >=700px */}
                        <div className="hidden md:block grid grid-cols-2 gap-4 ">
                            <div className="mb-4 flex flex-row items-center gap-2 w-fit">
                                <div className="">
                                    {Array.from({ length: review?.rating }, (_, index) => (
                                        <span key={index}>⭐</span>
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">{date}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{review?.message}</p>
                            <div className="items-center mt-6">
                                <Image
                                    src={`${IMAGE_URL}${review?.users?.profile_picture}` || '/no-image.png'}
                                    alt={userName}
                                    className="w-12 h-12 rounded-full mr-4"
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h4 className="font-bold dark:text-[#112D4E] ">{userName}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Versi untuk <700px */}
                        <div className="block md:hidden">
                            <div className="flex items-center mb-6">
                                <Image
                                    src={`${IMAGE_URL}${review.users.profile_picture}` || '/no-image.png'}
                                    alt={userName}
                                    className="w-12 h-12 rounded-full mr-4"
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h4 className="font-bold dark:text-[#3F72AF]">{userName}</h4>
                                    <div className="flex space-x-1">
                                        {Array.from({ length: review?.rating }, (_, index) => (
                                            <span key={index}>⭐</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review?.message}</p>
                            <span className="text-gray-500 text-sm">{date}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default ReviewCard