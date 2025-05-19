"use client";

import Link from "next/link";
import { User, Calendar, BarChart, CreditCard } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import { onLogin } from "@/store/slice/authSlice";

export default function Sidebar() {
  const dispatch = useAppDispatch();

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
          referral_code: user.referral_code,
          profile_picture: user.profile_picture,
        },
        isLogin: true,
      };
      dispatch(onLogin(userState)); // Update Redux state with transformed user data
    }
  }, [dispatch]);

  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="w-64 bg-[#112D4E] text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Event Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          {[
            {
              href: `/dashboard/profile?id=${user.id}`,
              icon: User,
              label: "Profile",
            },
            {
              href: `/dashboard/events?id=${user.id}`,
              icon: Calendar,
              label: "Events",
            },
            {
              href: `/dashboard/transactions?id=${user.id}`,
              icon: CreditCard,
              label: "Transactions",
            },
            {
              href: `/dashboard?id=${user.id}`,
              icon: BarChart,
              label: "Statistics",
            },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center py-2 px-4 rounded hover:bg-indigo-600"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
