import { configureStore } from '@reduxjs/toolkit'
import categoryReducers from './slice/categorySlice'
import eventReducers from './slice/eventSlice'
import eventsearchParamsReducers from './slice/eventSearchSlice'

export const store = configureStore({
    reducer: {
        categoryReducers,
        eventReducers,
        eventsearchParamsReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
