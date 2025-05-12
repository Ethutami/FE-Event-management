import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEventsState } from '@/interfaces/events.interface'

const initialState: IEventsState = {
    events: [],
}

const eventStatusSlice = createSlice({
    name: 'eventStatusReducer',
    initialState,
    reducers: {
        actionEventStatus(state, action: PayloadAction<IEventsState>) {
            return action.payload
        }
    },
})

export const { actionEventStatus } = eventStatusSlice.actions
export default eventStatusSlice.reducer
