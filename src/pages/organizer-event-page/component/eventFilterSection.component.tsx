'use client'
import { useState } from "react";
import { SquarePlus } from "lucide-react";

const FilterSection: React.FC = () => {
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [category, setCategory] = useState<string>('All');
    const [timeRange, setTimeRange] = useState<string>('This Month');
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold dark:text-[#112D4E]">Event Management Section</h2>
                <div className="flex items-center border rounded-full px-4 py-2 w-lg border-color-gray">
                    <span className="mr-2">🔍</span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none w-full text-sm text-color-gray"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
                <button
                    className={`px-6 py-2 rounded-lg font-medium ${status === 'active'
                        ? 'button'
                        : 'inactive-button border'
                        }`}
                    onClick={() => setStatus('active')}
                >
                    On Going
                </button>
                <button
                    className={`px-6 py-2 rounded-lg font-medium ${status === 'active'
                        ? 'button'
                        : 'inactive-button border'
                        }`}
                    onClick={() => setStatus('active')}
                >
                    Up Coming
                </button>
                <button
                    className={`px-6 py-2 rounded-lg font-medium ${status === 'inactive'
                        ? 'button'
                        : 'inactive-button border'
                        }`}
                    onClick={() => setStatus('inactive')}
                >
                    Expired
                </button>

                <select
                    className="px-2 py-2 rounded-lg border text-sm dark:text-[#112D4E]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Category</option>
                    <option>Workshop</option>
                    <option>Seminar</option>
                    <option>Webinar</option>
                </select>
                <select
                    className="px-2 py-2 rounded-lg border text-sm dark:text-[#112D4E]"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
                <div className="flex-1"></div>

                <button className="flex items-center px-5 py-2 bg-[rgba(63,114,175,0.1)] border border-[#DBE2EF] rounded-lg dark:text-[#112D4E] font-medium hover:text-white hover:bg-[rgba(63,114,175,0.2)] active:scale-95 transition-transform duration-150">
                    <SquarePlus className='mr-2 text-[#3F72AF]' /> New Event
                </button>
            </div>
        </div>
    );
};

export default FilterSection