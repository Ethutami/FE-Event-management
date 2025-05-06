export const handleError = (error: unknown, context: string) => {
    if (error instanceof Error) {
        console.error(`${context}:`, error.message);
    } else {
        console.error(`${context}: Unknown error`);
    }
    throw error;
};

export const checkResponse = async (response: Response, context: string) => {
    if (!response.ok) {
        const errorMessage = `HTTP error! status: ${response.status}`;
        handleError(new Error(errorMessage), context);
    }
};
