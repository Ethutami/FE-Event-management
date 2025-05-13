'use client'
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { eventApiService } from "@/services/eventApiService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actionEventStatus } from "@/store/slice/eventStatusSlice";
import { actionEventSearch } from "@/store/slice/eventSearchSlice";
import { ICategory } from "@/interfaces/category.interface";
import { filterEventsByStatus } from "@/components/checkEventStatus.component";

const FilterSection: React.FC = () => {
    const [status, setStatus] = useState<'ongoing' | 'upcoming' | 'expired' | 'default'>('default');
    const [categories, setCategory] = useState<ICategory[]>([]);
    const [categorySelected, setCategorySelected] = useState<{ id: number, category: string }>({
        id: 0,
        category: "",
    });
    const { events } = useAppSelector((state) => state?.eventsearchParamsReducers);
    const dispatch = useAppDispatch()
    const api = eventApiService()

    const getCategory = useCallback(async () => {
        const res = await api.fetchCategories()
        setCategory(res)
        return;
    }, [api])

    async function onHandleCategory(name: string) {
        const category = categories.find(cat => cat.category === name);
        if (category && category.id !== undefined && !isNaN(Number(category.id))) {
            setCategorySelected({ id: Number(category.id), category: category.category })
            dispatch(actionEventSearch({ category_id: category?.id, organizer_id: 4 }))
            setStatus('default')
        }
    }

    const onHandleStatus = (status: string) => {
        const data = filterEventsByStatus(events, status)
        dispatch(actionEventStatus({ events: data }))
    }

    useEffect(() => {
        getCategory()
    }, [getCategory])

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-row justify-center mb-8">
                <h2 className="text-2xl font-semibold dark:text-[#112D4E]">Event Management Section</h2>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
                <button
                    className={`px-6 py-2 rounded-lg font-medium ${status === 'ongoing' ? 'button' : 'inactive-button border'}`}
                    onClick={() => { setStatus('ongoing'); onHandleStatus('ongoing'); }}
                >
                    On Going
                </button>

                <button
                    className={`px-6 py-2 rounded-lg font-medium ${status === 'upcoming' ? 'button' : 'inactive-button border'}`}
                    onClick={() => { setStatus('upcoming'); onHandleStatus('upcoming') }}
                >
                    Up Coming
                </button>

                <button
                    className={`px-6 py-2 rounded-lg font-medium ${status === 'expired' ? 'button' : 'inactive-button border'}`}
                    onClick={() => { setStatus('expired'); onHandleStatus('expired') }}
                >
                    Expired
                </button>

                <select
                    className="px-2 py-2 rounded-lg border text-sm dark:text-[#112D4E]"
                    value={categorySelected?.category}
                    onChange={(e) => onHandleCategory(e.target.value)}
                >
                    {categories.map((item) => (
                        <option key={item.id} value={item.category}>
                            {item.category}
                        </option>
                    ))}
                </select>
                <div className="flex-1"></div>
                <Link href="/create-event-page">
                    <button className="flex items-center px-5 py-2 bg-[rgba(63,114,175,0.1)] border border-[#DBE2EF] rounded-lg dark:text-[#112D4E] font-medium hover:text-white hover:bg-[rgba(63,114,175,0.2)] active:scale-95 transition-transform duration-150">
                        <SquarePlus className='mr-2 text-[#3F72AF]' /> New Event
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FilterSection