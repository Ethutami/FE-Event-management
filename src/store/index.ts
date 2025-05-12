import { configureStore } from '@reduxjs/toolkit'
import categoryReducers from './slice/categorySlice'
import eventReducers from './slice/eventSlice'
import eventsearchParamsReducers from './slice/eventSearchSlice'
import eventStatusReducer from './slice/eventStatusSlice'
import auth from './slice/authSlice'

export const store = configureStore({
    reducer: {
        auth,
        categoryReducers,
        eventReducers,
        eventsearchParamsReducers,
        eventStatusReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
