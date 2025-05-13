import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { voucherApiService } from "@/services/voucherApiService";
import { IVoucher } from "@/interfaces/voucher.interface";
import VoucherModal from "./modal.component";

const VoucherCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [voucher, setVoucher] = useState<IVoucher>()
    const param = useParams()

    useEffect(() => {
        const api = voucherApiService()
        async function fetchData() {
            const res = await api.fetchEventVoucher(Number(param?.id))
            setVoucher(res)
        }
        fetchData()
    }, [param])
    if (voucher) {
        return (
            <>
                <div className="relative hidden md:block lg:block flex max-w-lg rounded-2xl overflow-hidden mt-10">
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-background z-20"></div>
                    <div className="flex w-full rounded-2xl overflow-hidden shadow-[6px_6px_12px_0px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_20px_0px_rgba(0,0,0,0.15)] transition-all duration-300">
                        <div className="relative bg-[#112D4E] text-[#F9F7F7] px-5 flex items-center justify-center overflow-hidden ">
                            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4 ">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="circle w-7 h-7 rounded-full -translate-x-1/2"
                                    />
                                ))}
                            </div>
                            <div className="transform -rotate-90 whitespace-nowrap text-lg font-bold tracking-widest z-10">
                                DISCOUNT
                            </div>
                            {/* Garis putus-putus */}
                            <div className="absolute right-0 top-0 bottom-0 border-r-4 border-dashed border-[#F2F2F2]"></div>
                        </div>
                        <div className="flex flex-col justify-between p-5 w-full bg-[#F2F2F2]">
                            <div>
                                <p className="text-gray-700 text-sm md:text-xs">Flat {voucher?.discount_percentage}% off*</p>
                                <h2 className="text-[#FBBC05] font-bold text-xl mt-1 md:text-base">{voucher?.code}</h2>
                                <p className="text-gray-500 text-sm mt-2 md:text-xs ">{voucher?.description}</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-[#3F72AF] text-xs mt-1 inline-block hover:underline transition"
                                >
                                    Terms & Conditions
                                </button>
                            </div>
                            <button className="mt-6 md:mt-2 w-full border border-[#ECE7F8] text-[#112D4E] rounded-full py-2 md:py-1 text-center text-sm md:text-xs font-semibold hover:bg-[#DBE2EF] transition">
                                Apply Code
                            </button>
                        </div>
                    </div>
                </div>

                <div className="block md:hidden lg:hidden ml-2 w-1/3 min-w-[110px] rounded-[16px] bg-[#F9F7F7] shadow-md  overflow-hidden relative mt-10">
                    <div className="bg-[#112D4E] dark:bg-[#FBBC05] text-[#FBBC05] dark:text-[#112D4E] text-xs font-bold py-3 text-center relative">
                        FINFIRST25
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F9F7F7] dark:bg-[#000] rounded-full -ml-2" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F9F7F7] dark:bg-[#000] rounded-full -mr-2" />
                    </div>
                    <div className="px-2 py-2">
                        <p className="text-[11px] text-gray-500 mt-1 leading-tight">
                            {voucher?.description}
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-[#3F72AF] text-xs mt-1 inline-block hover:underline transition"
                        >
                            Terms & Conditions
                        </button>
                    </div>
                    <div className="text-center text-[#112D4E] text-[13px] font-bold py-2 border-t border-gray-100 rounded-b-[16px] hover:bg-[#DBE2EF] transition">
                        CLAIM
                    </div>
                </div>

                <VoucherModal isOpen={showModal} onClose={() => setShowModal(false)} data={voucher} />
            </>
        );
    }
};

export default VoucherCard