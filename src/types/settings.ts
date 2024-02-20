import { LucideIcon } from "lucide-react";

export interface CategoryChildOption {
    name: string,
    value: any,
}

export interface SettingsChild {
    id: number,
    name: string,
    options: CategoryChildOption[],
}

export interface SettingsState {
    id: number,
    name: string,
    children?: SettingsChild[]
}

export interface CategoryChildOptionUI {
    name: string,
    label: string,
    value?: any;
}
export interface CategoryChildUI {
    id: number,
    name: string,
    type: 'switch' | 'select' | 'input',
    default?: boolean | string,
    description: string,
    hideName?: boolean,
    available?: boolean,
    link?: string,
    options?: CategoryChildOptionUI[],
}
export interface CategoryUI {
    id: number;
    name: string;
    icon: LucideIcon,
    children?: CategoryChildUI[],
}

// Define the type of initialState
export interface InitialState {
    isPreferencesModalOpen: boolean,
    value: SettingsState[];
}

export interface SessionType {
    name: string;
    duration: number;
    title: string;
    description: string;
}