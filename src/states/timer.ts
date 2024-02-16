import SessionHelper from "@/helpers/SessionHelper";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface TimerState {
    value: {
        name: string,
        cycleNumber: number,
        timeRemaining: number | null,
        isStarted: boolean,
        finishedPomodoro: number,
    }

}

// Define the initial state using that type
const initialState: TimerState = {
    value: {
        name: 'pomodoro',
        cycleNumber: 0,
        timeRemaining: null,
        isStarted: false,
        finishedPomodoro: 0,
    }
}

export const timerSlice = createSlice({
    name: 'timer',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        changeTimerSession: (state, action: PayloadAction<string>) => {
            state.value.name = action.payload;
        },

        increaseCycleNumber: state => {
            if (state.value.cycleNumber < 4) {
                if (state.value.name === SessionHelper.POMODORO) {
                    state.value.cycleNumber += 1;
                }
            } else {
                state.value.finishedPomodoro += 1;
                state.value.cycleNumber = 0;
            }
        },

        switchToNextSession: state => {
            // check to which session should switch to next
            if (state.value.name === SessionHelper.POMODORO) {
                if (state.value.cycleNumber < 4) {
                    state.value.name = SessionHelper.SHORT_BREAK;
                } else {
                    state.value.name = SessionHelper.LONG_BREAK;
                    state.value.cycleNumber = 0;
                }
            } else {
                state.value.name = SessionHelper.POMODORO;
            }
        }
    }
})

export const { changeTimerSession, increaseCycleNumber, switchToNextSession } = timerSlice.actions

export default timerSlice.reducer