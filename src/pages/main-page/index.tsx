"use client"

import { useAppSelector } from "@/lib/redux/hooks"; // Adjust the import path according to your project structure

export default function MainPage() {
  // Access the user state from the Redux store using the custom hook
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md m-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
        Welcome, {user.firstname} {user.lastname}!
      </h1>
    </div>
  );
}
