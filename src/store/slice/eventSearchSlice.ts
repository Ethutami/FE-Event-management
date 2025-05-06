import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventApiService } from "@/services/eventApiService";
import { ISearchParamsState } from "@/interfaces/searchParams.interface";

const api = eventApiService()

const initialState: ISearchParamsState = {
    events: [],
    loading: false,
    error: null
}

export const fetchEventSearch = createAsyncThunk(
    'eventsearchParamsReducers/fetchEventSearch',
    async (categoryId: number, thunkAPI) => {
        try {
            const data = await api.searchEvents({ category_id: categoryId });
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
            }
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);

const eventSearchSlice = createSlice({
    name: 'eventsearchParamsReducers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventSearch.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEventSearch.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload
            })
            .addCase(fetchEventSearch.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default eventSearchSlice.reducer