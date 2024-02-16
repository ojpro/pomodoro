import { LucideIcon } from "lucide-react";

export interface CategoryChildOption {
    name: string,
    value: string | number | boolean,
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

export interface PreferencesViewProps {
    isOpen: boolean,
    handleChange: (isOpen: boolean) => void;
}
export interface CategoryChildOptionUI {
    name: string,
    label: string,
}
export interface CategoryChildUI {
    id: number,
    name: string,
    type: 'switch' | 'select',
    default?: boolean,
    description: string,
    hideName?: boolean,
    options?: CategoryChildOptionUI[],
}
export interface CategoryUI {
    id: number;
    name: string;
    icon: LucideIcon,
    children?: CategoryChildUI[],
}