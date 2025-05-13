import { handleError } from "./erorHandler";

const createApiService = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    async function fetchEventReview(eventId: number) {
        try {
            const url = `${BASE_URL}/api/reviews/event/${eventId}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data?.data;
            }
        } catch (error) {
            handleError(error);
        }
    }
    return {
        fetchEventReview,
    };
};


let apiService: ReturnType<typeof createApiService> | null = null;

export const reviewApiService = () => {
    if (!apiService) {
        apiService = createApiService();
    }
    return apiService;
};
