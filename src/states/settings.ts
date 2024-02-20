import { settingConfigs } from "@/db/settings";
import { InitialState, SettingsState } from "@/types/settings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// get default settings
const initialSettings: InitialState = {
    isPreferencesModalOpen: false,
    value: settingConfigs,
};

// get localStorage settings
const localInitialSettings =  window.localStorage ? window.localStorage.getItem('settings') : null;

// define the initial settings to use
export const getInitialSettings = (): InitialState => {
    const state  = {...initialSettings};
    // Return local settings if they exist
    if (localInitialSettings !== null) {
        // Update state from local
        state.value = JSON.parse(localInitialSettings) as SettingsState[];
        return state;
    } else {
        // Otherwise, write the default settings to local storage and return them
        if ( window.localStorage) {
            localStorage.setItem('settings', JSON.stringify(state.value));
        }
        return state;
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
        updateSetting: (state, action: PayloadAction<{ settingId: number, childId: number, optionName: string, value: any, updateOption?: boolean }>) => {
            const { settingId, childId, optionName, value, updateOption } = action.payload;
            const setting = state.value.find(setting => setting.id === settingId);
            if (setting && setting.children) {
                const child = setting.children.find(child => child.id === childId);
                if (child) {
                    if (updateOption == true) {
                        child.options[0] = {
                            name: value.name,
                            value: value.value
                        };
                    } else {
                        const option = child.options.find(option => option.name === optionName);
                        if (option) {
                            option.value = value;
                        }
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