"use client"
import CardComponent from "./component/card.component"
import CategoryChips from "./component/category.component"
import { ImageSlider } from "./component/slider.component"


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