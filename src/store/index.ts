import { configureStore } from '@reduxjs/toolkit'
import categoryReducers from './slice/categorySlice'
import eventReducers from './slice/eventSlice'

export const store = configureStore({
    reducer: {
        categoryReducers,
        eventReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
