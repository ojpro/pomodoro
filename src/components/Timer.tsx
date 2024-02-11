import Countdown, {CountdownApi, zeroPad} from "react-countdown";
import {Button}                           from "@nextui-org/button";
import SessionHelper                      from "@/helpers/SessionHelper";
import React, {useEffect, useState}       from "react";

interface TimerProps {
    sessionType: string;
}

const Timer: React.FC<TimerProps> = ({sessionType}) => {
    const [sessionDuration, setSessionDuration] = useState<number>(SessionHelper.getDuration(sessionType));
    const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);

    // methods
    const isPaused = () => countdownApi && (countdownApi.isPaused() || countdownApi.isStopped());

    const toggleTimer = () => {
        if (isPaused()) {
            countdownApi?.start();
        } else {
            countdownApi?.pause();
        }
    };

    // watcher
    useEffect(() => {
        setSessionDuration(SessionHelper.getDuration(sessionType));

        // Pause the timer when the sessionType changes
        if (countdownApi && countdownApi.isStarted()) {

            countdownApi.pause();
        }
    }, [sessionType, countdownApi]);
    return (
        <>
            <Countdown
                date={Date.now() + sessionDuration}
                autoStart={false}
                ref={setCountdownApi}
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