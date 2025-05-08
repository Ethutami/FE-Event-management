"use client"
import { ImageSlider } from "@/pages/landing-page/component/slider.component"
import CategoryChips from '@/pages/landing-page/component/category.component';
import CardComponent from "@/pages/landing-page/component/card.component";

const HeroSection = () => {
  return (
    <div className="flex w-full bg-[#112D4E] dark:bg-[#F9F7F7]">
      <ImageSlider />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <CategoryChips />
      <CardComponent />
    </div>
  )
}