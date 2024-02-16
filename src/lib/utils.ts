import { CategoryUI, SettingsChild } from "@/types/settings";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toggleFullScreen(): void {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(r => { });
    } else if (document.exitFullscreen) {
        document.exitFullscreen().then(r => { });
    }
}

export const getSettingsByIds = (settings: any, categoryName: string, childName: string) => {
    return settings
        .find((category: CategoryUI) => category.name === categoryName)?.children
        ?.find((child: SettingsChild) => child.name === childName);
};
