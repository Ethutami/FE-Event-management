export interface IEvent {
    id: number;
    organizer_id: number;
    name: string;
    description: string;
    category_id: number;
    location: 'online' | 'offline' | string; // Use union type for known values
    start_date: string; // Can be string or Date object
    end_date: string;
    total_seats: number;
    remaining_seats: number;
    price: string | number; // String to handle decimal values or formatted prices
    created_at: string;
    path: string;
}