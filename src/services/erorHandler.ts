export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        if (!error.message.includes("Voucher not found")) {
            console.error(error.message);
        }
    } else {
        console.error('Unknown error');
    }
};

export const checkResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.statusText;
        handleError(new Error(`HTTP error ${response.status}: ${errorText}`));

    }
};
