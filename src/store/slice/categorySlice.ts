import { ICategoryState } from '@/interfaces/category.interface'
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'

const initialState: ICategoryState = {
    categories: [],
    loading: false,
    error: null,
}

async function fetchData() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/event/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data?.data
    } catch (error) {
        console.log('Error fetching data:', error)
        throw error
    }
}

export const fetchCategories = createAsyncThunk(
    'categoryReducers/fetchCategories',
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

const categorySlice = createSlice({
    name: 'categoryReducers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default categorySlice.reducer
