import { ISearchParams } from "@/interfaces/searchParams.interface";
import { checkResponse, handleError } from "./erorHandler";

const createApiService = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    async function fetchCategories() {
        try {
            const response = await fetch(`${BASE_URL}/event/categories`, {
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
            const response = await fetch(`${BASE_URL}/event/`, {
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

            const url = `${BASE_URL}/event/search?${query.toString()}`;
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
            const url = `${BASE_URL}/event/detail/${eventId}`;
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
    return {
        fetchCategories,
        fetchEvents,
        searchEvents,
        fetchEventDetail,
    };
};


let apiService: ReturnType<typeof createApiService> | null = null;

export const eventApiService = () => {
    if (!apiService) {
        apiService = createApiService();
    }
    return apiService;
};
