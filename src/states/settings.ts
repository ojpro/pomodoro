import { settingConfigs } from "@/db/settings";
import { SettingsState } from "@/types/settings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SettingsState[] = settingConfigs;
const localInitialSettings = window.localStorage.getItem('settings');
const getInitialSettings = (): SettingsState[] => {
    if (localInitialSettings !== null) {
        return JSON.parse(localInitialSettings);
    } else {
        localStorage.setItem('settings', JSON.stringify(initialState));
        return initialState;
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: getInitialSettings,
    reducers: {
        updateSetting: (state, action: PayloadAction<{ settingId: number, childId: number, optionName: string, value: string | number | boolean }>) => {
            const { settingId, childId, optionName, value } = action.payload;
            const setting = state.find(setting => setting.id === settingId);
            if (setting && setting.children) {
                const child = setting.children.find(child => child.id === childId);
                if (child) {
                    const option = child.options.find(option => option.name === optionName);
                    if (option) {
                        option.value = value;
                    }
                }
            }

            // save changes locally
            localStorage.setItem('settings', JSON.stringify(state));
        },
    },
});

export const { updateSetting } = settingsSlice.actions;

export default settingsSlice.reducer;