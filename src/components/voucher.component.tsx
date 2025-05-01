import { useEffect, useState } from "react";
import { IVoucher } from "@/interfaces/voucher.interface";
import VoucherModal from "./modal.component";

const VoucherCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [voucher, setVoucher] = useState<IVoucher>()
    useEffect(() => {
        fetch('http://localhost:8080/api/voucher/event/65', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setVoucher(data?.data)
            })
    }, [voucher])
    return (
        <>
            <div className="relative flex max-w-lg rounded-2xl overflow-hidden mt-16">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-background z-20"></div>
                <div className="flex w-full rounded-2xl overflow-hidden shadow-[6px_6px_12px_0px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_20px_0px_rgba(0,0,0,0.15)] transition-all duration-300">
                    <div className="relative bg-[#112D4E] text-[#F9F7F7] flex items-center justify-center px-3 py-6 overflow-hidden w-2/4">
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 ">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="circle w-9 h-9 rounded-full -translate-x-1/2"
                                />
                            ))}
                        </div>
                        <div className="transform -rotate-90 whitespace-nowrap text-lg font-bold tracking-widest z-10">
                            DISCOUNT
                        </div>
                        {/* Garis putus-putus */}
                        <div className="absolute right-0 top-0 bottom-0 border-r-4 border-dashed border-[#F2F2F2]"></div>
                    </div>
                    <div className="flex flex-col justify-between p-6 w-full bg-[#F2F2F2]">
                        <div>
                            <p className="text-gray-700 text-sm">Flat {voucher?.discount_percentage}% off*</p>
                            <h2 className="text-[#FBBC05] font-bold text-xl mt-1">{voucher?.code}</h2>
                            <p className="text-gray-500 text-sm mt-2">{voucher?.description}</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="text-[#3F72AF] text-xs mt-1 inline-block hover:underline transition"
                            >
                                Terms & Conditions
                            </button>
                        </div>
                        <button className="mt-6 w-full border border-[#ECE7F8] text-[#112D4E] rounded-full py-2 text-center text-sm font-semibold hover:bg-[#DBE2EF] transition">
                            Apply Code
                        </button>
                    </div>
                </div>
            </div>
            <VoucherModal isOpen={showModal} onClose={() => setShowModal(false)} data={voucher} />
        </>
    );
};

export default VoucherCard