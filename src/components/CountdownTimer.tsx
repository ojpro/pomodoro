import SessionHelper from "@/helpers/SessionHelper";
import useNotification from "@/hooks/notification";
import { useAppDispatch, useAppSelector } from '@/hooks/states';
import { getSettingsByNames } from "@/lib/utils";
import { increaseCycleNumber, switchToNextSession } from "@/states/timer";
import { SettingsChild, SettingsState } from "@/types/settings";
import { Button } from "@nextui-org/button";
import { useCallback, useEffect, useState } from "react";
import Countdown, { CountdownApi, zeroPad } from "react-countdown";
import useSound from 'use-sound';


export default function CountdownTimer() {
    //states
    const timerSession = useAppSelector(state => state.timer.value);
    const settings = useAppSelector<SettingsState[]>(state => state.settings.value);
    const dispatch = useAppDispatch();
    const { showNotification } = useNotification();
    const [sessionDuration, setSessionDuration] = useState<number>(timerSession.timeRemaining || SessionHelper.getDuration(timerSession.name));
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);
    const [playClockTicking, { stop }] = useSound('/sounds/clock_ticking.mp3', {
        loop: true,
        volume: 0.5,
    });

    // methods
    const isTimerPaused = (): boolean | null => countdownApi && (countdownApi.isPaused() || countdownApi.isStopped());

    const stopClockTicking = useCallback(() => stop(), [stop]);

    const startTimer = () => {
        const clockTickingSound: SettingsChild | undefined = getSettingsByNames(settings, 'Sounds', 'Clock Ticking Sound');

        if (clockTickingSound?.options[0].value == true) {
            playClockTicking();
        }
        countdownApi?.start();
    }

    const stopTimer = useCallback(() => {
        stopClockTicking();
        countdownApi?.pause();
    },[countdownApi, stopClockTicking])

    const toggleTimer = () => {
        if (isTimerPaused()) {
            startTimer();
        } else {
            stopTimer();
        }
    };

    const handleCompletion = () => {
        // increase the pomodoro cycle number
        dispatch(increaseCycleNumber());

        // switch to the next session
        dispatch(switchToNextSession());

        // set completion state
        setIsCompleted(true);
    }

    const handleNotification = useCallback(() => {
        const notificationDetails = SessionHelper.getNotificationInfo(timerSession.name);

        // change notification details
        const notificationSettings: SettingsChild | undefined = getSettingsByNames(settings, 'General', 'Notifications');

        // show notification only when they are enabled
        if (notificationSettings?.options[0].value == true) {

            showNotification(notificationDetails.title, {
                body: notificationDetails.description
            });
        }
    }, [settings, showNotification, timerSession.name]);


    // watcher
    useEffect(() => {
        // set the new session duration
        setSessionDuration(SessionHelper.getDuration(timerSession.name));

        // Pause the timer when the sessionType changes
        stopTimer();
    }, [stopTimer, timerSession.name]);

    useEffect(() => {
        if (isCompleted) {
            // show notification
            handleNotification();

            // no need for it now ^_^
            setIsCompleted(false);
        }
    }, [handleNotification, isCompleted])


    return (
        <>
            <Countdown
                date={sessionDuration}
                autoStart={false}
                ref={setCountdownApi}
                onComplete={handleCompletion}
                renderer={(props: { minutes: any; seconds: any; }) => (
                    <Button color="default" variant="light"
                        onClick={() => toggleTimer()}
                        className='text-white w-fit h-fit font-bold text-9xl md:text-[10rem]  absolute top-1/2 -translate-y-1/2 -translate-x-1/2'>
                        {zeroPad(props.minutes)} : {zeroPad(props.seconds)}
                    </Button>)}
            />

        </>
    );
}