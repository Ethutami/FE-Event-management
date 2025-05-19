"use client";

import { IMAGE_URL } from "@/config";
import Image from "next/image";
import { Calendar, CircleParking, LogOutIcon, SquarePen, Zap } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import EditProfileForm from "./component/form";
import { useState } from "react";
import { onLogout } from "@/store/slice/authSlice";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import UpdateProfileModal from "@/components/updateProfile.modal";

export default function ProfilePage() {
  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10">
        {/* <!-- Header Section --> */}
        <div className="bg-[#112D4E] text-white p-6 flex gap-3 relative">
          <div className="relative">
            <Image
              src={IMAGE_URL + user.profile_picture || "/no-image.png"}
              alt="profile-picture"
              className="rounded-full border-white border-solid border-1"
              width={80}
              height={50}
            />
            <SquarePen
              className="absolute bottom-0 right-0 text-[#112D4E] bg-white rounded-sm"
              onClick={() => setShowModal(true)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">
              {user.first_name + " " + user.last_name}
            </h1>
            <p className="text-[#FFCB00]">{user.email}</p>
          </div>
          <LogOutIcon
            className="text-white hover:text-red-500 absolute right-0 mr-6"
            onClick={() => {
              dispatch(onLogout());
              deleteCookie("access_token");
              router.push("/");
            }}
          />
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
        <EditProfileForm />
      </div>
      <UpdateProfileModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
