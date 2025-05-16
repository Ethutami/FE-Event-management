"use client";

import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config";

export default function VerifyPage() {
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await axios.patch(`${API_URL}/api/auth/verify`, {
            token,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="bg-[#F9F7F7] flex flex-col items-center p-16 rounded-lg shadow-md w-[750px] h-[300px] mx-auto mt-16">
      <h1 className="text-3xl text-center font-bold mb-6 text-[#112D4E]">
        Email Verified Successfully
      </h1>
      <p className="text-xl text-center font-bold">
        Your email has been verified. You can now log in to your account.
      </p>
      <Link
        href="/signin"
        className="text-center w-32 p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF] mt-4"
      >
        Log In
      </Link>
    </div>
  );
}
