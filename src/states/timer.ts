import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState}             from "@/states/store";
import SessionHelper                from "@/helpers/SessionHelper";

// Define a type for the slice state
export interface TimerState {
    value: {
        name: string,
        cycleNumber: number,
        timeRemaining: number,
        isStarted: boolean,
        finishedPomodoro: number,
    }

}

// Define the initial state using that type
const initialState: TimerState = {
    value: {
        name: 'pomodoro',
        cycleNumber: 0,
        timeRemaining: 0,
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
                if(state.value.name === SessionHelper.POMODORO){
                    state.value.cycleNumber += 1;
                }
            } else {
                state.value.finishedPomodoro += 1;
                state.value.cycleNumber = 0;
            }
        },

        switchToNextSession: state => {
            // check to which session should switch next
            if (state.value.name === SessionHelper.POMODORO) {
                if (state.value.cycleNumber < 4) {
                    state.value.name = SessionHelper.SHORT_BREAK;
                } else {
                    state.value.name = SessionHelper.LONG_BREAK;
                }
            } else {
                state.value.name = SessionHelper.POMODORO;
            }
        }
    }
})

export const {changeTimerSession, increaseCycleNumber, switchToNextSession} = timerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTimer = (state: RootState) => state.timer

export default timerSlice.reducer