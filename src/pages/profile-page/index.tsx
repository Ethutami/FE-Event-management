"use client";

import { useEffect } from "react";
import Link from "next/link";

import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { onLogin, onLogout } from "@/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import { useRouter } from "next/navigation";
import { IMAGE_URL } from "@/config";

export default function ProfilePage() {
  const router = useRouter();
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
          profile_picture: user.profile_picture,
        },
        isLogin: true,
      };
      dispatch(onLogin(userState)); // Update Redux state with transformed user data
    }
  }, [dispatch]);

  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);

  const handleOnClick = () => {
    deleteCookie("access_token");
    dispatch(onLogout());
    router.push("/");
  };

  return (
    <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-3xl m-auto">
      <div className="max-w-2xl flex justify-between">
        <div>
          <Link href="#">
            <img src={IMAGE_URL+user.profile_picture} alt="profile-picture" className="border-s-black" />
          </Link>
          <p className="text-2xl font-bold mb-6 text-[#112D4E]">
            {user.first_name + " " + user.last_name}
          </p>
          <p className="text-2xl font-bold mb-6 text-[#112D4E]">{user.email}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]">
          Edit
        </button>
      </div>
      <button
        onClick={handleOnClick}
        className="w-[150px] h-[50px] p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
      >
        Logout
      </button>
    </div>
  );
}
