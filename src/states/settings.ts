import { settingConfigs } from "@/db/settings";
import { InitialState, SettingsState } from "@/types/settings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// get default settings
const initialState: InitialState = {
    isPreferencesModalOpen: false,
    value: settingConfigs
};

// get localStorage settings
const localInitialSettings = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('settings') : null;

// define the initial settings to use
const getInitialSettings = (): InitialState => {
    // Return local settings if they exist
    if (localInitialSettings !== null) {
        // Update state from local
        initialState.value = JSON.parse(localInitialSettings) as SettingsState[];
        return initialState;
    } else {
        // Otherwise, write the default settings to local storage and return them
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('settings', JSON.stringify(initialState.value));
        }
        return initialState;
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialSettings(),
    reducers: {
        // update preferences modal state
        setIsPreferencesModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isPreferencesModalOpen = action.payload;
        },
        // update specific setting
        updateSetting: (state, action: PayloadAction<{ settingId: number, childId: number, optionName: string, value: string | number | boolean }>) => {
            const { settingId, childId, optionName, value } = action.payload;
            const setting = state.value.find(setting => setting.id === settingId);
            if (setting && setting.children) {
                const child = setting.children.find(child => child.id === childId);
                if (child) {
                    const option = child.options.find(option => option.name === optionName);
                    if (option) {
                        option.value = value;
                    }
                }
            }

            // Save changes locally
            localStorage.setItem('settings', JSON.stringify(state.value));
        },
    },
});

export const { setIsPreferencesModalOpen, updateSetting } = settingsSlice.actions;

export default settingsSlice.reducer;