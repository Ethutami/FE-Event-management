import { configureStore } from '@reduxjs/toolkit'
import categoryReducers from './slice/categorySlice'

export const store = configureStore({
    reducer: {
        categoryReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
