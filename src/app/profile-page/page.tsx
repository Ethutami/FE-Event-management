"use client";

import { IMAGE_URL } from "@/config";
import Image from "next/image";
import { Calendar, CircleParking, Zap } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import EditProfileForm from "./component/form";

export default function ProfilePage() {
  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
        {/* <!-- Header Section --> */}
        <div className="bg-[#112D4E] text-white p-6 flex gap-3">
          <Image
            src={IMAGE_URL + user.profile_picture || "/no-image.png"}
            alt="profile-picture"
            className="rounded-full border-white border-solid border-1"
            width={80}
            height={50}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">
              {user.first_name + " " + user.last_name}
            </h1>
            <p className="text-[#FFCB00]">{user.email}</p>
          </div>
        </div>

        {/* <!-- Events Registered Section --> */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-start gap-24">
            <div className="text-center">
              <p className="text-[#112D4E]">Events Registered</p>
              <p className="text-2xl flex gap-2 text-[#FFCB00] font-bold">
                <Calendar className="self-center" /> 21
              </p>
            </div>
            <div className="text-center">
              <p className="text-[#112D4E]">Points</p>
              <p className="text-2xl flex gap-2 text-[#FFCB00] font-bold">
                <CircleParking className="self-center" /> 100
              </p>
            </div>
            <div className="text-center">
              <p className="text-[#112D4E]">Voucher & Coupon</p>
              <p className="text-2xl flex gap-2 text-[#FFCB00] font-bold">
                <Zap className="self-center" />5
              </p>
            </div>
          </div>
        </div>
        <EditProfileForm/>
      </div>
    </div>
  );
}
