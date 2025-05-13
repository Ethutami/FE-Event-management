import { ICategory } from "./category.interface";
import { IUsers } from "./user.interface";
export interface IEvent {
    id: number;
    organizer_id: number;
    name: string;
    description: string;
    category_id: number;
    location: 'online' | 'offline' | string;
    start_date: string;
    end_date: string;
    total_seats: number;
    remaining_seats: number;
    price: number;
    created_at: string;
    path: string;
    users: IUsers;
    event_category: ICategory;
}
export interface IEventsState {
    events: IEvent[]
    loading?: boolean
    error?: string | null
}