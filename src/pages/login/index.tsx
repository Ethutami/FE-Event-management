import Image from "next/image";
import LoginForm from "./components/form";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between">
      <div className="flex justify-center items-center w-full md:w-1/2">
        <LoginForm/>
      </div>
      <Image
        src={"/banner.svg"}
        width={550}
        height={500}
        alt="banner"
        className="object-cover"
      />
    </div>
  );
}
