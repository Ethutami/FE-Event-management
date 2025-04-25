import { ImageSlider } from "@/components/slider.component"
import CategoryChips from '@/components/category.component';

const HeroSection = () => {
    return (
        <div className="flex w-full bg-[#112D4E] dark:bg-[#F9F7F7]">
            <ImageSlider />
        </div>
    )
}

const CategorySection = async () => <CategoryChips />

export default function LandingPage() {
    return (
        <div>
            <HeroSection />
            <CategorySection />
        </div>
    )

}