"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actionEvents } from "@/store/slice/eventSlice";
import { IEvent } from "@/interfaces/events.interface";
import createDateFormatter from "@/components/dateformater";

const EventCard = ({ name, start_date, price, path, id }: IEvent) => {
  const date = createDateFormatter(start_date).includeWeekday().build();
  const priceTag = Number(price) != 0 ? `Rp.${price}` : "Free";
  return (
    <Link href={`/detail/${id}`}>
      <div className="bg-[#DBE2EF] rounded-2xl shadow-md overflow-hidden w-full max-w-xs focus:outline-none transition-transform hover:scale-105">
        <div className="relative h-40 w-full">
          <Image
            src={path || "/no-image.png"}
            alt={name}
            fill
            className="rounded-t-2xl"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <div className="p-4 text-sm">
          <h3 className="font-semibold mb-1 dark:text-[#112D4E]">{name}</h3>
          <p className="text-gray-600">{date}</p>
          <p className="mt-2 text-lg font-bold text-[#FBBC05]">{priceTag}</p>
          <button className="button mt-3 px-4 py-1 rounded-md ">Book</button>
        </div>
      </div>
    </Link>
  );
};

const CardComponent = () => {
  const dispatch = useAppDispatch();
  const {
    events: defaultEvents,
    loading: defaultLoading,
    error: defaultError,
  } = useAppSelector((state) => state?.eventReducers);

  const {
    events: searchEvents,
    loading: searchLoading,
    error: searchError,
  } = useAppSelector((state) => state?.eventsearchParamsReducers);

  const isSearching = searchEvents?.length > 0;

  const events = isSearching ? searchEvents : defaultEvents;
  const loading = isSearching ? searchLoading : defaultLoading;
  const error = isSearching ? searchError : defaultError;

  useEffect(() => {
    dispatch(actionEvents());
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-16">
      {events.map((event: IEvent) => (
        <EventCard key={event?.id} {...event} id={event?.id} />
      ))}
    </div>
  );
};

export default CardComponent;
