'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { IReview } from "@/interfaces/review.interface";
import formatDate from "./dateformater";

const ReviewCard = () => {
    const [reviews, setReviews] = useState<IReview[]>([])

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
            })
    }, [])

    if (!reviews || reviews.length === 0) {
        return <div>There is no review yet</div>;
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 single-grid">
            {reviews.map((review: IReview, index: number) => {
                const date = formatDate(review?.created_at, false, true, false)
                const userName = review?.users?.first_name + ' ' + review?.users?.last_name
                return (
                    <div
                        key={index}
                        className={`p-6 mt-8 rounded-lg shadow-md bg-white review-card ${index % 2 === 0 ? 'left-align' : 'right-align'
                            }`}
                    >
                        {/* Versi untuk >=700px */}
                        <div className="hidden md:block">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex space-x-1">
                                    {Array.from({ length: review?.rating }, (_, index) => (
                                        <span key={index}>⭐</span>
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">{date}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{review?.message}</p>
                            <div className="flex items-center mt-6">
                                <Image
                                    src={review.users.profile_picture}
                                    alt={userName}
                                    className="w-12 h-12 rounded-full mr-4"
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h4 className="font-bold">{userName}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Versi untuk <700px */}
                        <div className="block md:hidden">
                            <div className="flex items-center mb-6">
                                <Image
                                    src={review.users.profile_picture}
                                    alt={userName}
                                    className="w-12 h-12 rounded-full mr-4"
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <h4 className="font-bold">{userName}</h4>
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