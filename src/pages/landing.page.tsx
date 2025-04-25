"use-client"
import { ImageSlider } from "@/components/slider.component"

const HeroSection = () => {
    return (
        <div className="flex w-full bg-[#112D4E] dark:bg-[#F9F7F7]">
            <ImageSlider />
        </div>
    )
}

const categories = [
    'Music',
    'Sports & Games',
    'Food & Drink',
    'Travel & Tourism',
    'Health & Hygiene',
    'Performing & Visual Arts',
    'Education',
    'Politics',
    'Community'
]

const CategorySection = () => {

    return (
        <section className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-12">Category</h1>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            //onClick={onClick}
                            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full 
                            bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-300 transition-all
                            duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <span className="font-medium text-center px-2">
                                {category}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function LandingPage() {
    return (
        <div>
            <HeroSection />
            <CategorySection />
        </div>
    )

}