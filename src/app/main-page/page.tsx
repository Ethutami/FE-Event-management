"use client"
import { ImageSlider } from "./component/slider.component";
import CategoryChips from "./component/category.component";
import CardComponent from "./component/card.component";


const HeroSection = () => {
    return (
        <div className="flex w-full bg-[#112D4E] dark:bg-[#F9F7F7]">
            <ImageSlider />
        </div>
    )
}

export default function MainPage() {
    return (
        <div >
            <HeroSection />
            <CategoryChips />
            <CardComponent />
        </div>
    )
}