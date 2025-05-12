import { IEvent } from "./events.interface";

export interface ISearchParams {
    min_price?: number;
    max_price?: number;
    category_id?: number;
    start_date?: string;
    end_date?: string;
    organizer_id?: number;
}

export interface ISearchParamsState {
    events: IEvent[];
    loading: boolean;
    error: string | null;
}