import { useEffect, useState } from 'react';

interface NotificationHook {
    showNotification: (message: string, options?: NotificationOptions) => void;
}

const useNotification = (): NotificationHook => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const handleNotificationClick = () => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
    };

    const requestPermissionAndCreateNotification = (message: string, options: NotificationOptions) => {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                setNotifications([]); // Clear old notifications when permission is granted
            }
        });
    };

    const showNotification = (message: string, options: NotificationOptions = {}) => {
        if (!('Notification' in window)) {
            console.warn('This browser does not support desktop notification');
            return;
        }

        if (Notification.permission === 'granted') {
            const notification = new Notification(message, options);
            notification.onclick = handleNotificationClick;
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        } else if (Notification.permission !== 'denied') {
            // Request permission inside a user-generated event handler
            const requestPermissionHandler = () => {
                requestPermissionAndCreateNotification(message, options);
                document.removeEventListener('click', requestPermissionHandler);
            };

            // Adding event listener for user-generated event
            document.addEventListener('click', requestPermissionHandler);
        }
    };

    useEffect(() => {
        return () => {
            notifications.forEach((notification) => notification.close());
        };
    }, [notifications]);

    return { showNotification };
};

export default useNotification;
