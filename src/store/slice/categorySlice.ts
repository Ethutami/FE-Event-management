import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import { ICategoryState } from '@/interfaces/category.interface'
import { eventApiService } from '@/services/eventApiService';

const api = eventApiService()

const initialState: ICategoryState = {
    categories: [],
    loading: false,
    error: null,
}

export const actionCategories = createAsyncThunk(
    'categoryReducers/eventCategories',
    async (_, thunkAPI) => {
        try {
            const data = await await api.fetchCategories()
            return data

        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
            }
            return thunkAPI.rejectWithValue('Something went wrong')
        }
    }
)

const categorySlice = createSlice({
    name: 'categoryReducers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actionCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(actionCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(actionCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default categorySlice.reducer
