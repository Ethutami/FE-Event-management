import { getCookie } from "cookies-next";
import { checkResponse, handleError } from "./erorHandler";
import { ISearchParams } from "@/interfaces/searchParams.interface";
import { IEvent } from "@/interfaces/events.interface";

const createApiService = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = getCookie("access_token") as string;;
    type IUpdateEvent = Partial<Pick<
        IEvent,
        | 'name'
        | 'description'
        | 'total_seats'
        | 'remaining_seats'
        | 'price'
        | 'start_date'
        | 'end_date'
        | 'category_id'
        | 'organizer_id'
    >>;

    async function fetchCategories() {
        try {
            const response = await fetch(`${BASE_URL}/api/events/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            await checkResponse(response);

            const data = await response.json()
            return data?.data
        } catch (error) {
            handleError(error);
        }
    }

    async function fetchEvents() {
        try {
            const response = await fetch(`${BASE_URL}/api/events/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            await checkResponse(response);

            const data = await response.json();
            return data?.data;
        } catch (error) {
            handleError(error);
        }
    }

    async function searchEvents(params: ISearchParams) {
        try {
            const query = new URLSearchParams();

            if (params.min_price !== undefined) query.append("min_price", params.min_price.toString());
            if (params.max_price !== undefined) query.append("max_price", params.max_price.toString());
            if (params.category_id !== undefined) query.append("category_id", params.category_id.toString());
            if (params.start_date) query.append("start_date", params.start_date);
            if (params.end_date) query.append("end_date", params.end_date);
            if (params.organizer_id) query.append("organizer_id", params.organizer_id.toString());

            const url = `${BASE_URL}/api/events/search?${query.toString()}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            await checkResponse(response);

            const data = await response.json();
            return data?.data;
        } catch (error) {
            handleError(error);
        }
    }

    async function fetchEventDetail(eventId: number) {
        try {
            const url = `${BASE_URL}/api/events/detail/${eventId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            await checkResponse(response);

            const data = await response.json();
            return data?.data;
        } catch (error) {
            handleError(error);
        }
    }

    async function updateEvent(eventId: number, body: IUpdateEvent) {
        try {
            const url = `${BASE_URL}/api/events/${eventId}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body),
            });
            await checkResponse(response);

            const data = await response.json();
            return data?.data;
        } catch (error) {
            handleError(error)
        }
    }

    async function deleteEvent(eventId: number) {
        try {
            const url = `${BASE_URL}/api/events/${eventId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            await checkResponse(response);
        } catch (error) {
            handleError(error)
        }
    }

    async function createEvent(body: IUpdateEvent) {
        try {
            const url = `${BASE_URL}/api/events/`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            await checkResponse(response);
        } catch (error) {
            handleError(error)
        }
    }

    return {
        fetchCategories,
        fetchEvents,
        searchEvents,
        fetchEventDetail,
        updateEvent,
        deleteEvent,
        createEvent,
    };

};

let apiService: ReturnType<typeof createApiService> | null = null;

export const eventApiService = () => {
    if (!apiService) {
        apiService = createApiService();
    }
    return apiService;
};
