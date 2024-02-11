export default class SessionHelper {
    private static sessionTypes: Record<string, { name: string, duration: number }> = {
        'pomodoro': {name: 'Pomodoro', duration: 25},
        'short-break': {name: 'Short Break', duration: 5},
        'long-break': {name: 'Long Break', duration: 15}
    };

    static getAllTypes(): Record<string, { name: string, duration: number }> {
        return this.sessionTypes;
    }

    static getDuration(type: string): number {
        return this.sessionTypes[type].duration * 60 * 1000;
    }
}
