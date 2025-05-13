"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { Edit3, LogOut } from "lucide-react";
import { onLogin, onLogout } from "@/store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IMAGE_URL } from "@/config";
import { IAuth, IUser } from "@/interfaces/auth.interface";

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
    <div className="px-10 pt-10 rounded-lg shadow-md w-screen m-auto flex flex-row justify-between">
      <div className="flex flex-row">
        <Image src={IMAGE_URL + user.profile_picture || '/no-image.png'} alt="profile-picture" className="border-s-black" width={100} height={100} />
        <div>
          <p className="text-xl font-bold text-[#112D4E]">
            {user?.first_name + " " + user.last_name}
          </p>
          <p className="mb-6 text-[#FBBC05]">{user.email}</p>
        </div>
        <Edit3 className="hover:text-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]" />
      </div>
      <LogOut
        onClick={handleOnClick}
        className="hover:text-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
      />
    </div>
  );
}
