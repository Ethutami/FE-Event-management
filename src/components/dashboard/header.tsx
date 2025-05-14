"use client";

import { useAppDispatch } from "@/store/hooks";
import { onLogout } from "@/store/slice/authSlice";
import { deleteCookie } from "cookies-next";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Organizer Dashboard
        </h2>
        <LogOutIcon
          className="text-[#3F72AF] hover:text-red-500"
          onClick={() => {
            dispatch(onLogout());
            deleteCookie("access_token");
            router.push("/");
          }}
        />
      </div>
    </header>
  );
}
