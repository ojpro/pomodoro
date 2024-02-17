import { CategoryUI } from "@/types/settings";
import { Home, Image, Volume2 } from "lucide-react";

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
        name: 'Sounds',
        icon: Volume2,
        children: [
            {
                id: 1,
                name: 'Session Changing Sound',
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
        id: 3,
        name: 'Backgrounds',
        icon: Image,
        children: [
            {
                id: 1,
                name: 'Background',
                type: 'select',
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
        name: 'Sounds',
        children: [
            {
                id: 1,
                name: 'Session Changing Sound',
                options: [
                    {
                        name: 'session-changing-sound',
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
        id: 3,
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