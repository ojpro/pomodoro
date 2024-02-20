import { CategoryUI } from "@/types/settings";
import { AlarmClock, Home, Image, Volume2 } from "lucide-react";

export const settingsPresentation: CategoryUI[] = [
    {
        id: 1,
        name: 'General',
        icon: Home,
        children: [
            {
                id: 1,
                name: 'Notifications',
                type: 'switch',
                default: true,
                available: true,
                description: 'Toggle Notifications',
            },
            {
                id: 2,
                name: 'Auto-Start',
                type: 'switch',
                default: false,
                available: false,
                description: 'Automaticly start next session when finish',
            },
        ],
    },
    {
        id: 2,
        name: 'Timer',
        icon: AlarmClock,
        children: [
            {
                id: 1,
                name: 'Custom Sessions Duration',
                type: 'select',
                available: true,
                default: 'popular',
                description: 'Change the default sessions duration',
                options: [
                    {
                        name: 'popular',
                        label: 'Popular',
                        value: {
                            'pomodoro': 25,
                            'short-break': 5,
                            'long-break': 15,
                        },
                    },
                    {
                        name: 'extanded',
                        label: 'Extanded',
                        value: {
                            'pomodoro': 45,
                            'short-break': 10,
                            'long-break': 20,
                        },
                    },
                    {
                        name: 'deep-work',
                        label: 'Deep Work',
                        value: {
                            'pomodoro': 60,
                            'short-break': 15,
                            'long-break': 30,
                        },
                    },
                    {
                        name: 'custom',
                        label: 'Custom',
                        value: {
                            'pomodoro': 25,
                            'short-break': 5,
                            'long-break': 15,
                        },
                    },
                ]
            },
            {
                id: 2,
                name: 'Adjust Durations',
                type: 'input',
                available: false,
                link: 'Custom Sessions Duration',
                description: 'Adjust the durations',
                options: [
                    {
                        name: 'pomodoro',
                        label: 'Pomodoro',
                    },
                    {
                        name: 'short-break',
                        label: 'Short Break',
                    },
                    {
                        name: 'long-break',
                        label: 'Long Break',
                    },
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Sounds',
        icon: Volume2,
        children: [
            {
                id: 1,
                name: 'Click Sound',
                type: 'switch',
                default: true,
                available: true,
                description: 'Buttons click sound effect',
            },
            {
                id: 2,
                name: 'Clock Ticking Sound',
                type: 'switch',
                default: false,
                available: true,
                description: 'Clock Ticking Sound effect whicle running',
            },
        ]
    },
    {
        id: 4,
        name: 'Backgrounds',
        icon: Image,
        children: [
            {
                id: 1,
                name: 'Background',
                type: 'select',
                default: 'random',
                available: false,
                description: 'Randomly switch between background images',
                hideName: true,
                options: [
                    {
                        name: 'random',
                        label: 'Random'
                    },
                    {
                        name: 'custom',
                        label: 'Custom'
                    },
                    {
                        name: 'url',
                        label: 'From URL'
                    },
                ]
            }
        ]
    },
];


export const settingConfigs = [
    {
        id: 1,
        name: 'General',
        children: [
            {
                id: 1,
                name: 'Notifications',
                options: [
                    {
                        name: 'notifications',
                        value: true,
                    }
                ]
            },
            {
                id: 2,
                name: 'Auto-Start',
                options: [
                    {
                        name: 'auto-start',
                        value: false,
                    }
                ]
            },
        ],
    },
    {
        id: 2,
        name: 'Timer',
        children: [
            {
                id: 1,
                name: 'Custom Sessions Duration',
                options: [
                    {
                        name: 'popular',
                        value: {
                            'pomodoro': 25,
                            'short-break': 5,
                            'long-break': 15,
                        },
                    },
                ]
            },
        ]
    },
    {
        id: 3,
        name: 'Sounds',
        children: [
            {
                id: 1,
                name: 'Click Sound',
                options: [
                    {
                        name: 'click-sound',
                        value: true,
                    }
                ]
            },
            {
                id: 2,
                name: 'Clock Ticking Sound',
                options: [
                    {
                        name: 'clock-ticking-sound',
                        value: false,
                    }
                ]
            },
        ]
    },
    {
        id: 4,
        name: 'Backgrounds',
        children: [
            {
                id: 1,
                name: 'Background',
                options: [
                    {
                        name: 'background',
                        value: 'random',
                    }
                ]
            }
        ]
    },
];