"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { IMAGE_URL } from "@/config";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { authSlice, onLogin } from "@/lib/redux/features/authSlice";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import { ImageSlider } from "./component/slider.component";
import CategoryChips from "./component/category.component";
import CardComponent from "./component/card.component";

const HeroSection = () => {
  return (
    <div className="flex w-full bg-[#112D4E] dark:bg-[#F9F7F7]">
      <ImageSlider />
    </div>
  )
}

export default function MainPage() {
  const user = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("access_token") as string;
    if (token) {
      const user = jwtDecode<IUser>(token);
      const userState: IAuth = {
        user: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          profile_picture: user.profile_picture
        },
        isLogin: true,
      };
      dispatch(onLogin(userState));
    }
  }, [dispatch]);

  return (
    <>
      <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md m-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
          {/* Welcome, {user.first_name} {user.last_name}! */}
        </h1>
        {/* <Link href="/profile">
          <Image
            src={IMAGE_URL + user.profile_picture}
            alt="profile-avatar"
            className="w-[50px] h-[50px] bg-blue-900"
          />
        </Link> */}
      </div>
      <div>
        <HeroSection />
        <CategoryChips />
        <CardComponent />
      </div>

    </>
  );
}
