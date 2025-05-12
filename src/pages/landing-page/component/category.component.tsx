"use client"
import { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ICategory } from "@/interfaces/category.interface";
import { actionCategories, } from "@/store/slice/categorySlice";
import { actionEventSearch } from "@/store/slice/eventSearchSlice";

const CategoryChips = () => {
    const dispatch = useAppDispatch()
    const { categories, loading, error } = useAppSelector((state) => state?.categoryReducers)

    useEffect(() => {
        dispatch(actionCategories())
    }, [dispatch])

    const handleCategoryClick = (categoryId: number) => {
        dispatch(actionEventSearch({ category_id: categoryId }));
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>
    }

    return (
        <section className="w-full p-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center min-[700px]:text-left">Category</h1>
            <div className="hidden min-[700px]:block w-26 h-2 bg-[#0D2B50] rounded-full min-[700px]:ml-0 mx-auto"></div>
            <div className="flex gap-4 px-4 py-2 w-max">
                {categories.map((category: ICategory, index: number) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryClick(category?.id)}
                        className="flex flex-col items-center min-w-[60px] text-center m-8 max-[500px]:m-1 focus:outline-none transition-transform hover:scale-105"
                    >
                        <Image
                            key={index}
                            src={category.path}
                            alt={category.category}
                            width={40}
                            height={40}
                            className="custom-size object-cover flex items-center justify-center w-30 h-30 rounded-full"
                        />
                        <span className="text-sm">{category.category}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategoryChips
