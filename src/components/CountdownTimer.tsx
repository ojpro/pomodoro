import SessionHelper from "@/helpers/SessionHelper";
import useNotification from "@/hooks/notification";
import { useAppDispatch, useAppSelector } from "@/hooks/states";
import { increaseCycleNumber, switchToNextSession } from "@/states/timer";
import { Button } from "@nextui-org/button";
import React, { useCallback, useEffect, useState } from "react";
import Countdown, { CountdownApi, zeroPad } from "react-countdown";
import useSound from "use-sound";

interface NotificationProps {
  title: string;
  description: string;
}

const Timer: React.FC = () => {
  //states
  const timerSession = useAppSelector((state) => state.timer.value);
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();
  const [sessionDuration, setSessionDuration] = useState<number>(
    SessionHelper.getDuration(timerSession.name)
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);
  const [playClockTicking, { stop }] = useSound("/sounds/clock_ticking.mp3", {
    loop: true,
    volume: 0.5,
  });

  // methods
  const isPaused = () =>
    countdownApi && (countdownApi.isPaused() || countdownApi.isStopped());
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
    // stop the clock ticking
    stopClockTicking();

    // increase the pomodoro cycle number
    dispatch(increaseCycleNumber());

    // switch to the next session
    dispatch(switchToNextSession());

    // set completation state
    setIsCompleted(true);
  };

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

  useEffect(() => {
    if (isCompleted) {
      // get the new notification details based on the current session
      const notificationDetails = SessionHelper.getNotificationInfo(
        timerSession.name
      );

      // show notification
      showNotification(notificationDetails.title, {
        body: notificationDetails.description,
      });

      // revert back the completion state
      setIsCompleted(false);
    }
  }, [isCompleted, timerSession, showNotification]);
  return (
    <>
      <Countdown
        date={Date.now() + sessionDuration}
        autoStart={false}
        ref={setCountdownApi}
        onComplete={handleCompletion}
        renderer={(props) => (
          <Button
            color="default"
            variant="light"
            onClick={() => toggleTimer()}
            className="text-white dark:text-gray-900 w-fit h-fit font-bold text-9xl text-[10rem] absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          >
            {zeroPad(props.minutes)} : {zeroPad(props.seconds)}
          </Button>
        )}
      />
    </>
  );
};

export default Timer;