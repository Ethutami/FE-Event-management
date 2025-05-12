import React from 'react';
import { IVoucherModalProps } from '@/interfaces/voucher.interface';
import createDateFormatter from '@/components/dateformater';


const VoucherModal: React.FC<IVoucherModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    let date = '';
    if (data?.expired_date) {
        date = createDateFormatter(data.expired_date).includeTime().build()
    }
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 pt-16 shadow-lg flex flex-col relative">
                <div className="absolute top-0 left-0 bg-[#3F72AF] text-xs text-[#F9F7F7] px-4 py-2 rounded-md shadow mb-4 self-start">
                    Available untill {date}
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                    ✖
                </button>
                <div className='flex flex-row justify-between items-start'>
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-[#112D4E]">{data?.name}</h2>
                        <p className="text-gray-500 text-sm mb-6">{data?.description}</p>
                    </div>
                    <div className="flex justify-end ">
                        <div className="bg-blue-50 p-4 rounded-lg text-center shadow-inner flex flex-col items-center min-w-[120px]">
                            <p className="text-xs font-semibold text-gray-600">Flat {data?.discount_percentage}% off</p>
                            <button className="mt-2 bg-blue-800 text-white px-4 py-1 rounded-full text-xs hover:bg-blue-900 transition">
                                Claim
                            </button>
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#112D4E]">Terms & Conditions</h3>
                <div className="text-sm text-gray-600 leading-relaxed max-h-[300px] overflow-y-auto px-2 mb-6">
                    <p className="mb-2">{data?.tnc_description}</p>
                </div>
            </div>
        </div>
    );
};

export default VoucherModal;
