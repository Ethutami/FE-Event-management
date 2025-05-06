import { IEventsState } from "@/interfaces/events.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IEventsState = {
    events: [],
    loading: false,
    error: null,
}

async function fetchData() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data?.data;

    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}

export const fetchEvents = createAsyncThunk(
    'eventReducers/fetchevents',
    async (_, thunkAPI) => {
        try {
            const data = await fetchData()
            return data
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
            }
            return thunkAPI.rejectWithValue('Something went wrong')
        }
    }
)

const eventSlice = createSlice({
    name: 'eventReducers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default eventSlice.reducer