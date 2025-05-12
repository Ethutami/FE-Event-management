"use client";
import { ImageSlider } from "./component/slider.component";
import CategoryChips from "./component/category.component";
import CardComponent from "./component/card.component";
import ProfilePage from "../profile-page";

const HeroSection = () => {
  return (
    <div className="flex w-full bg-[#112D4E] dark:bg-[#F9F7F7]">
      <ImageSlider />
    </div>
  )
}

export default function MainPage() {
  return (
    <>
      <div className="bg-[#F9F7F7] p-8 rounded-lg shadow-md w-[500px] max-w-md m-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#112D4E]">
        </h1>
      </div>
      <div>
        <ProfilePage />
        <HeroSection />
        <CategoryChips />
        <CardComponent />
      </div>

    </>
  );
}
