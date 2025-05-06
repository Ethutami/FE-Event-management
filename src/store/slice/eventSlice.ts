import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEventsState } from "@/interfaces/events.interface";
import { eventApiService } from "@/services/eventApiService";

const api = eventApiService()

const initialState: IEventsState = {
    events: [],
    loading: false,
    error: null,
}

export const fetchEvents = createAsyncThunk(
    'eventReducers/fetchevents',
    async (_, thunkAPI) => {
        try {
            const data = await api.fetchEvents()
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