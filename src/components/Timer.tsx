import Countdown, {CountdownApi, zeroPad} from "react-countdown";
import {Button} from "@nextui-org/button";
import SessionHelper from "@/helpers/SessionHelper";
import React, {useEffect, useState, useCallback} from "react";
import {useAppDispatch, useAppSelector} from '@/hooks/states';
import {increaseCycleNumber, switchToNextSession} from "@/states/timer";
import useSound from 'use-sound';


const Timer: React.FC = () => {
    //states
    const timerSession = useAppSelector(state => state.timer.value);
    const dispatch = useAppDispatch();

    const [sessionDuration, setSessionDuration] = useState<number>(SessionHelper.getDuration(timerSession.name));
    const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);
    const [playClockTicking, {stop}] = useSound('/sounds/clock_ticking.mp3', {
        loop: true,
        volume: 0.5,
    });

    // methods
    const isPaused = () => countdownApi && (countdownApi.isPaused() || countdownApi.isStopped());
    const stopClockTicking = useCallback(() => stop(), [stop]);

    const toggleTimer = () => {
        if (isPaused()) {
            playClockTicking();

            countdownApi?.start();
        } else {
            stopClockTicking();

            countdownApi?.pause();
        }
    };

    const handleCompletion = () => {

        stopClockTicking();

        dispatch(increaseCycleNumber());

        dispatch(switchToNextSession());
    }

    // watcher
    useEffect(() => {
        // set the new session duration
        setSessionDuration(SessionHelper.getDuration(timerSession.name));

        // Pause the timer when the sessionType changes
        if (countdownApi && countdownApi.isStarted()) {
            countdownApi.pause();
        }

        // stop the clock ticking sound effect on session change
        stopClockTicking();
    }, [timerSession, countdownApi, stopClockTicking]);
    return (
        <>
            <Countdown
                date={Date.now() + sessionDuration}
                autoStart={false}
                ref={setCountdownApi}
                onComplete={handleCompletion}
                renderer={(props) => (
                    <Button color="default" variant="light"
                            onClick={() => toggleTimer()}
                            className='text-white dark:text-gray-900 w-fit h-fit font-bold text-9xl text-[10rem] absolute top-1/2 -translate-y-1/2 -translate-x-1/2'>
                        {zeroPad(props.minutes)} : {zeroPad(props.seconds)}
                    </Button>)}
            />

        </>
    );
}

export default Timer;