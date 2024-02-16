import { CategoryUI } from "@/types/settings";
import { Home, Image, Info } from "lucide-react";

export const settingsPresentation : CategoryUI[] = [
    {
        id: 1,
        name: 'General',
        icon: Home,
        children: [
            {
                id: 1,
                name: 'Notifications',
                type: 'switch',
                default: false,
                description: 'Toggle Notifications',
            },
            {
                id: 2,
                name: 'Auto-Start',
                type: 'switch',
                default: true,
                description: 'Automaticly start next session when finish',
            },
        ],
    },
    {
        id: 2,
        name: 'Backgrounds',
        icon: Image,
        children: [
            {
                id: 1,
                name: 'Background',
                type: 'select',
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
    {
        id: 3,
        name: 'About',
        icon: Info,
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
                        value: false,
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
    {
        id: 3,
        name: 'About',
    },
];