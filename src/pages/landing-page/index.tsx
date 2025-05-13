import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F7] mx-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
          Welcome to our website!
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <Link
            href="/signin"
            className="text-center w-full md:w-1/2 p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-center w-full md:w-1/2 p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
