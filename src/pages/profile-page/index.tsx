"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

import { onLogin, onLogout } from "@/lib/redux/features/authSlice";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { IAuth } from "@/interfaces/auth.interface";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Retrieve user data from the cookie on component mount
  useEffect(() => {
    const token = getCookie("access_token") as string;
    if (token) {
      const { user } = jwtDecode<IAuth>(token); // Decode the JWT to get user data
      const userData = {
        user: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
        isLogin: true,
      };
      dispatch(onLogin(userData)); // Update Redux state with transformed user data
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
    <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md m-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
        {user.first_name}
      </h1>
      <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
        {user.last_name}
      </h1>
      <button
        onClick={handleOnClick}
        className="w-full p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
      >
        Logout
      </button>
    </div>
  );
}
