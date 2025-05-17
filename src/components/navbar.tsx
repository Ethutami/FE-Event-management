"use client";

import { IMAGE_URL } from "@/config";
import { IAuth, IUser } from "@/interfaces/auth.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onLogin, onLogout } from "@/store/slice/authSlice";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isVisible] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = (): void => {
    setIsClicked((prevState) => !prevState);
  };

  const closeNavbar = (): void => {
    setIsClicked(false);
  };

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
          referral_code: user.referral_code,
          profile_picture: user.profile_picture,
        },
        isLogin: true,
      };
      dispatch(onLogin(userState)); // Update Redux state with transformed user data
    }
  }, [dispatch]);

  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const links = [
    { name: "Home", url: "#home" },
    { name: "About", url: "#about" },
    { name: "Contact Us", url: "#contact" },
  ];

  return (
    <nav
      ref={navbarRef}
      className={`bg-[#112D4E] fixed top-0 w-full z-50 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link className="text-white text-xl" href="#">
                <p className="text-lg font-bold md:text-xl">
                  <span className="text-white">Bee</span>Vent
                </p>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-6">
              {links.map(({ name, url }) => (
                <a
                  key={name}
                  className="text-white text-base font-bold hover:border-b hover:border-b-white p-1"
                  href={url}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-6">
              {!isLogin && (
                <div className="flex gap-3">
                  <Link
                    href="/signin"
                    className="text-center w-[100px] p-2 rounded-lg bg-white text-[#112D4E] font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="signup"
                    className="text-center w-[100px] p-2 rounded-lg bg-white text-[#112D4E] font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              {isLogin && (
                <>
                  <Link href="/profile">
                    <Image
                      src={IMAGE_URL + user.profile_picture || "/no-image.png"}
                      alt="profile-picture"
                      className="rounded-full w-[40px] h-[40px] border-white border-solid border-1"
                      //eslint error -> widht dan height is must
                      width={40}
                      height={40}
                    />
                  </Link>
                  <LogOutIcon
                    className="text-white hover:text-red-500"
                    onClick={() => {
                      dispatch(onLogout());
                      deleteCookie("access_token");
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
              aria-label="Toggle navigation"
            >
              {isClicked ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClicked && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLogin && (
              <Link href="/profile">
                <Image
                  src={IMAGE_URL + user.profile_picture || "/no-image.png"}
                  alt="profile-picture"
                  className="rounded-full border-white border-solid border-1 ml-5 mb-2"
                  //eslint error -> widht dan height is required
                  width={40}
                  height={40}
                />
              </Link>
            )}
            {links.map(({ name, url }) => (
              <Link
                key={name}
                className="text-sm font-bold block ml-4 w-24 text-white hover:border-b hover:border-b-white p-1"
                href={url}
                onClick={closeNavbar}
              >
                {name}
              </Link>
            ))}
            {isLogin && (
              <LogOutIcon
                className="text-white ml-5 mt-3 hover:text-red-500"
                onClick={() => {
                  dispatch(onLogout());
                  deleteCookie("access_token");
                }}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
