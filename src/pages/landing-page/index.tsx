import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md m-auto mt-16">
      <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
        Welcome to our website!
      </h1>
      <div className="flex gap-3">
        <Link
          href="/signin"
          className="text-center w-full p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
        >
          Sign In
        </Link>
        <Link
          href="signup"
          className="text-center w-full p-4 rounded-lg bg-[#112D4E] text-white font-bold hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#DBE2EF]"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
