import { IUsers } from "./user.interface";

export interface IReview {
    id: number;
    user_id: number;
    event_id: number;
    message: string;
    rating: number;
    created_at: string;
    users: IUsers
}
