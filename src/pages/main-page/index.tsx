"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

import { onLogin } from "@/lib/redux/features/authSlice";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import Link from "next/link";
import { IMAGE_URL } from "@/config";

export default function MainPage() {
  const dispatch = useAppDispatch();

  // Retrieve user data from the cookie on component mount
  useEffect(() => {
    const token = getCookie("access_token") as string;
    if (token) {
      const user = jwtDecode<IUser>(token); // Decode the JWT to get user data
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
      dispatch(onLogin(userState)); // Update Redux state with transformed user data
    }
  }, [dispatch]);

  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md m-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
        Welcome, {user.first_name} {user.last_name}!
      </h1>
      <Link href="/profile">
        <img
          src={ IMAGE_URL + user.profile_picture}
          alt="profile-avatar"
          className="w-[50px] h-[50px] bg-blue-900"
        />
      </Link>
    </div>
  );
}
