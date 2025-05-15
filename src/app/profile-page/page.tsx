"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { onLogin, onLogout } from "@/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IMAGE_URL } from "@/config";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import Image from "next/image";

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
          id: user.id,
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
    <div className="p-10 rounded-lg shadow-md m-auto h-[500px] flex flex-col justify-center items-center">
      <Image
        src={IMAGE_URL + user.profile_picture || "/no-image.png"}
        alt="profile-picture"
        className="rounded-full w-[75px] h-[75px] border-black border-solid border-1 mb-4"
        width={100}
        height={100}
      />
      <div className="text-center">
        <p className="text-xl uppercase font-bold text-[#112D4E] mb-2">
          {user?.first_name + " " + user.last_name}
        </p>
        <p className="mb-6 text-[#FBBC05]">{user.email}</p>
      </div>
      <button
        onClick={handleOnClick}
        className="text-center w-32 p-2 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] mt-4"
      >
        <Link
          href="/reset-password"
          className="text-white text-sm"
        >
          Reset Password
        </Link>
      </button>
    </div>
  );
}
