import { getSettingsByNames } from "@/lib/utils";
import { SessionType, SettingsChild } from "@/types/settings";

export default class SessionHelper {
    static readonly POMODORO = 'pomodoro';
    static readonly SHORT_BREAK = 'short-break';
    static readonly LONG_BREAK = 'long-break';

    private static sessionTypes: Record<string, SessionType> = {
        'pomodoro': {
            name: 'Pomodoro',
            duration: 25,
            title: "Focused Hour",
            description: "Stay focused for 25 minutes! Work hard, stay on track, and make progress."
        },
        'short-break': {
            name: 'Short Break',
            duration: 5,
            title: "Quick Rest",
            description: "Take a 5-minute break. Relax, breathe, and recharge for the next sprint."
        },
        'long-break': {
            name: 'Long Break',
            duration: 15,
            title: "Recharge Break",
            description: "Enjoy a 15-minute break. Refresh, relax, and come back ready to tackle more tasks."
        }
    };

    static getAllTypes(): Record<string, { name: string, duration: number }> {
        return this.sessionTypes;
    }

    static getDuration(settings: any, type: string): number {
        const durationSettings: SettingsChild | undefined = getSettingsByNames(settings, 'Timer', 'Custom Sessions Duration');
        const duration = durationSettings?.options[0].value[type];

        return Date.now() + duration * 60 * 1000;
    }

    static getNotificationInfo(type: string): { title: string, description: string } {
        return {
            title: this.sessionTypes[type].title,
            description: this.sessionTypes[type].description,
        };
    }
}
