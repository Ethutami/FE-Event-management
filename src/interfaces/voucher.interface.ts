export interface IVoucher {
    id: number;
    event_id: number;
    name: string;
    description: string;
    tnc_description: string;
    discount_percentage: number;
    start_date: string;
    expired_date: string;
    code: string;
    max_usage: number;
    current_usage: number;
}

export interface IVoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: IVoucher
}