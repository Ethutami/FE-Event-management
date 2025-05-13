'use client'
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { CalendarDays, MapPin, SquarePlus, Tag } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { eventApiService } from '@/services/eventApiService';
import { IEvent } from '@/interfaces/events.interface';
import { ICategory } from '@/interfaces/category.interface';
import createDateFormatter from '@/components/dateformater';

export const EventDetails = () => {
    const [categories, setCategory] = useState<ICategory[]>([]);
    const [categorySelected, setCategorySelected] = useState<{ id: number, category: string }>({
        id: 0,
        category: "",
    });
    const [data, setData] = useState<IEvent | null>()
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string>('')
    const [eventDescription, setEventDescription] = useState<string>('')
    const [eventPrice, setEventPrice] = useState<number>(0)
    const [eventSeat, setEventSeat] = useState<number>(0)
    const [validateSeat, setValidateSeat] = useState<string>()
    const [newStartDate, setNewStartDate] = useState<Date | null>();
    const [newEndDate, setEndDate] = useState<Date | null>();
    const [imagePath, setImagePath] = useState('');
    const [buttonSave, setButtonSave] = useState(false);
    const param = useParams()
    const router = useRouter();
    const api = eventApiService()

    const isFormValid = () => {
        return (
            eventPrice >= 0 &&
            eventSeat > 0 &&
            newStartDate !== null &&
            endDate !== null &&
            categorySelected.category !== '' &&
            eventDescription.trim() !== '' &&
            eventName.trim() !== ''
        );
    };

    const handleCategoryService = useCallback(async () => {
        const res = await api.fetchCategories()
        setCategory(res)
    }, [api])

    const handleDataService = useCallback(async () => {
        const res = await api.fetchEventDetail(Number(param?.id))
        setData(res)
    }, [api, param?.id])

    function handleUpdateService() {
        const ISOStartDate = newStartDate?.toISOString() || "2025-05-15T10:00:00Z"
        const ISOEndDate = newEndDate?.toISOString() || "2025-05-15T18:00:00Z"

        let seats = 0
        let remainingSeats = 0
        if (eventSeat) {
            const totalSeat = data?.total_seats ?? 0
            const availableSeat = data?.remaining_seats ?? 0
            const bookedSeat = totalSeat - availableSeat;

            if (eventSeat <= bookedSeat) {
                setValidateSeat(`Max seat must more than ${bookedSeat}`)
                return;
            } else if (eventSeat >= bookedSeat) {
                remainingSeats = eventSeat - bookedSeat
                seats = eventSeat
            }
        }
        const fields: Partial<IEvent> = {
            name: eventName || data?.name,
            description: eventDescription || data?.description,
            total_seats: seats || data?.total_seats,
            remaining_seats: remainingSeats || data?.remaining_seats,
            price: eventPrice || data?.price,
            start_date: ISOStartDate,
            end_date: ISOEndDate,
            category_id: categorySelected?.id || data?.category_id,
            path: data?.path
        };
        const eventDetails: Partial<IEvent> = {};

        for (const key of Object.keys(fields) as (keyof IEvent)[]) {
            const value = fields[key];
            if (
                value !== undefined &&
                value !== null &&
                value !== '' &&
                (typeof value === 'string' || typeof value === 'number')
            ) {
                eventDetails[key] = value as never;
            }
        }
        async function set() {
            await api.updateEvent(Number(param?.id), eventDetails)
            handleDataService()
            setIsEditMode(!isEditMode)
            return;
        }
        set()
        return;
    }

    const onAppear = useCallback(async () => {
        handleCategoryService()
        if (param?.id) {
            try {
                handleDataService()
            } catch (error) {
                console.log('detail', error);
            }
            return;
        } else {
            setIsEditMode(true)
            setEventPrice(0)
            setEventSeat(0)
            setEventPrice(0)
            setEventSeat(0)
            setNewStartDate(null)
            setEndDate(null)
            setImagePath('')
            return;
        }
    }, [handleCategoryService, handleDataService, param?.id]);

    const onCreateData = () => {
        const newData = {
            name: eventName.toString(),
            description: eventDescription.toString(),
            category_id: Number(categorySelected.id),
            start_date: newEndDate?.toISOString().toString(),
            end_date: newStartDate?.toISOString().toString(),
            total_seats: Number(eventSeat),
            remaining_seats: Number(eventSeat),
            price: Number(eventPrice),
            path: "https://picsum.photos/id/61/600/400",
            organizer_id: Number(4),
        }
        async function set() {
            await api.createEvent(newData)
        }
        set()
    }

    useEffect(() => {
        onAppear();
    }, [onAppear]);

    useEffect(() => {
        if (data?.path) {
            setImagePath(data.path);
        }
    }, [data]);

    const startDate = createDateFormatter(data?.start_date ?? '').dateFormat().build()
    const endDate = createDateFormatter(data?.end_date ?? '').dateFormat().build()
    const time = createDateFormatter(data?.start_date ?? '').onlyTime().build()
    const created = createDateFormatter(data?.created_at ?? '').dateFormat().build()

    function onHandleCategory(name: string) {
        const category = categories.find(cat => cat.category === name);
        if (category && category.id !== undefined && !isNaN(Number(category.id))) {
            setCategorySelected({ id: Number(category.id), category: category.category })
        }
    }

    const onHandleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePath(imageUrl);
        }
    };

    const toggleEditMode = () => {
        if (param?.id) {
            setIsEditMode(true);
            setCategory([]);
            setEventPrice(data?.price || 0)
            setEventSeat(data?.total_seats || 0)
            setImagePath(data?.path || '')
            setEventDescription(data?.description || '')
            setEventName(data?.name || '')
            handleCategoryService();
            if (buttonSave) {
                handleUpdateService();
                return;
            }
        } else {
            onCreateData();
            router.back();
        }
    };

    const onDelete = () => {
        handleCategoryService()
        if (isEditMode) {
            setIsEditMode(true)
            setEventPrice(0)
            setEventPrice(0)
            setEventSeat(0)
            setNewStartDate(null)
            setEndDate(null)
            setImagePath('')
            setEventDescription('')
            setEventName('')
        } else {
            try {
                api.deleteEvent(Number(param?.id))
                api.searchEvents({ organizer_id: 4 })
                router.back()
                return;
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="mt-16 flex flex-col mx-auto bg-white p-8 rounded-xl shadow-md text-sm">
            <div className='header-event-detail mb-16'>
                <button
                    onClick={router.back}
                    className="items-center text-[#3F72AF] font-medium text-sm cursor-pointer"
                >
                    ← Back
                </button>
                <h2 className="lg:text-center md:text-center text-2xl font-semibold mb-6 dark:text-[#112D4E]">Event Details</h2>
                {
                    param?.id ?
                        <button
                            onClick={() => router.push('/create-event-page')}
                            className="flex items-center px-8 py-0 bg-[rgba(63,114,175,0.1)] border border-[#DBE2EF] rounded-lg dark:text-[#112D4E] font-medium hover:text-white hover:bg-[rgba(63,114,175,0.2)] active:scale-95 transition-transform duration-150">
                            <SquarePlus className='mr-2 text-[#3F72AF] py-0' /> New Event
                        </button>
                        : <span></span>
                }
            </div>
            <div >
                <div className="lg:grid md:grid md:grid-cols-4 gap-6">
                    <div className="col-span-2">
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Event Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={isEditMode ? eventName : data?.name || ''}
                                readOnly={!isEditMode}
                                onChange={(e) => {
                                    setEventName(e.target.value)
                                }}
                                className={`w-full pl-10 pr-3 py-2 rounded border border-color-gray ${isEditMode ? 'cursor-text text-[#112D4E]' : 'cursor-not-allowed text-color-gray'}`}
                            />
                            <Tag className="absolute left-3 top-2.5 h-4 w-4 text-color-gray" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Start Date</label>
                        <div className="relative">
                            {isEditMode ? <DatePicker
                                selected={newStartDate}
                                onChange={(date) => setNewStartDate(date)}
                                className="w-full pl-10 pr-3 py-2 rounded border border-color-gray text-[#112D4E]"
                            /> :
                                <input
                                    type="date"
                                    value={startDate || ''}
                                    readOnly={!isEditMode}
                                    className="w-full pl-10 pr-3 py-2 rounded border border-color-gray text-color-gray cursor-not-allowed"
                                />}
                            <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-color-gray" />
                        </div>
                        <label className="text-2xs font-light mb-1 block dark:text-[#112D4E]">*Start date must be at least tomorrow.</label>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">End Date</label>
                        <div className="relative">
                            {isEditMode ? <DatePicker
                                selected={newEndDate}
                                onChange={(date) => setEndDate(date)}
                                className="w-full pl-10 pr-3 py-2 rounded border border-color-gray text-[#112D4E]"
                            /> :
                                <input
                                    type="date"
                                    value={endDate || ''}
                                    readOnly
                                    className={`w-full pl-10 pr-3 py-2 rounded border text-color-gray border-color-gray ${isEditMode ? '' : 'cursor-not-allowed'}`}
                                />}
                            <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-color-gray" />
                        </div>
                        <label className="text-2xs font-light mb-1 block dark:text-[#112D4E]">*End date must be after start date</label>
                    </div>
                </div>
                <div className="lg:grid md:grid md:grid-cols-4 gap-6 mt-6">
                    <div className='col-span-2'>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Location</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={data?.location || 'Online'}
                                readOnly
                                className={`w-full pl-10 pr-3 py-2 rounded border text-color-gray border-color-gray cursor-not-allowed`}
                            />
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-color-gray" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Category</label>
                        <select
                            className={`w-full px-3 py-2 rounded border border-color-gray ${isEditMode ? 'text-[#112D4E]' : 'cursor-not-allowed text-color-gray'}`}
                            value={isEditMode ? categorySelected?.category : data?.event_category?.category}
                            disabled={!isEditMode}
                            onChange={(e) => onHandleCategory(e.target.value)}
                        >
                            {categories.map((item) => (
                                <option key={item.id} value={item.category}>
                                    {item.category}
                                </option>
                            ))}
                        </select>
                    </div>
                    {
                        !isEditMode && <div>
                            <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Event Time</label>
                            <input
                                type="time"
                                value={time || ''}
                                readOnly
                                className="w-full px-3 py-2 rounded border text-color-gray border-color-gray cursor-not-allowed"
                            />
                        </div>
                    }

                </div>
            </div>
            <div className="mt-5">
                <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Event Description</label>
                <textarea
                    value={isEditMode ? eventDescription : data?.description}
                    onChange={(e) => setEventDescription(e.target.value)}
                    readOnly={!isEditMode}
                    className={`w-full p-3 h-28 rounded border border-color-gray ${isEditMode ? 'cursor-text text-[#112D4E]' : 'cursor-not-allowed text-color-gray'} resize-none`}
                />
            </div>
            <div className="flex flex-col justify-between flex-fiture-button">
                <div className="lg:flex items-end gap-2 flex-fiture-price md:grid md:grid-cols-2">
                    <div className="relative ">
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Ticket Price</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={isEditMode ? eventPrice : data?.price || 0}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    value = value.replace('.', '');
                                    setEventPrice(Number(value));
                                }}
                                readOnly={!isEditMode}
                                className={`w-full pl-10 pr-3 py-2 rounded border border-color-gray ${isEditMode ? 'cursor-text text-[#112D4E]' : 'cursor-not-allowed text-color-gray'}`}
                            />
                            <Tag className="absolute left-3 top-2.5 h-4 w-4 text-color-gray" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Max Seats</label>
                        <label className='text-[#ee2737] text-xs'>{validateSeat}</label>
                        <input
                            type="number"
                            value={isEditMode ? eventSeat : data?.total_seats || ''}
                            onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace('.', '');
                                setEventSeat(Number(value))
                            }}
                            readOnly={!isEditMode}
                            className={`w-full px-3 py-2 rounded border border-color-gray ${isEditMode ? 'cursor-text text-[#112D4E]' : 'cursor-not-allowed text-color-gray'}`}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Available Seats</label>
                        <input
                            type="number"
                            value={data?.remaining_seats || ''}
                            readOnly
                            className='w-full px-3 py-2 rounded border text-color-gray border-color-gray cursor-not-allowed'
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium mb-1 block dark:text-[#112D4E]">Created</label>
                        <input
                            type="date"
                            value={created || ''}
                            disabled
                            className="w-full px-3 py-2 rounded border text-color-gray border-color-gray cursor-not-allowed"
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-start gap-2 sm:flex-row lg:items-end">
                    <button
                        onClick={() => { toggleEditMode(); setButtonSave(!buttonSave) }}
                        disabled={!param?.id && isEditMode && !isFormValid()}
                        className=
                        {`h-9 px-10 
                                    ${isEditMode ? 'bg-[rgba(46,194,167,0.8)]' : 'bg-[rgba(63,114,175,0.4)]'}  
                                    border-[#DBE2EF] dark:text-[#112D4E] hover:text-white 
                                    ${isEditMode ? 'hover:bg-[rgba(46,194,167,1)]' : 'hover:bg-[rgba(63,114,175,0.8)]'} 
                                    active:scale-95 transition-transform duration-150 text-sm rounded-md font-medium 
                                    ${!param?.id && isEditMode && !isFormValid() ? 'cursor-not-allowed' : 'cursor-pointer '}`}
                    >{isEditMode ? 'Save' : 'Edit'}
                    </button>
                    <button
                        onClick={onDelete}
                        className="h-9 px-10 bg-[rgba(238,39,55,0.4)] text-[#EE2737] hover:text-white hover:bg-[rgba(238,39,55,10)] active:scale-95 transition-transform duration-150 text-sm rounded-md font-medium cursor-pointer"
                    >{isEditMode ? 'Reset' : 'Delete'}
                    </button>
                </div>
            </div>
            {isEditMode &&
                <div className='mt-16 border border-color-gray rounded-lg p-2 lg:w-fit dark:text-[#112D4E]'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onHandleImageChange}
                        className="cursor-pointer"
                    />
                </div>}
            {imagePath &&
                <Image src={imagePath} alt="image" className="w-screen h-screen object-cover relative mt-16 image" width={800} height={800} priority />
            }
        </div>
    );
};