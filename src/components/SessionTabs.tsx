import {Tab, Tabs} from "@nextui-org/tabs";
import SessionHelper from "@/helpers/SessionHelper";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/states";
import {changeTimerSession} from "@/states/timer";
import useSound from 'use-sound';

export default function SessionTabs() {
    //states
    const timerSession = useAppSelector(state => state.timer.value);
    const dispatch = useAppDispatch();
    const [playSwitchSound] = useSound('/sounds/button_click.mp3')

    // methods
    const handleSessionChange = (sessionType: React.Key) => {
        dispatch(changeTimerSession(sessionType.toString()));
    };

    // watchers
    useEffect(() => {
        playSwitchSound();
    }, [playSwitchSound, timerSession]);

    return (
        <div className="flex flex-wrap gap-4 py-6">
            <Tabs radius='md' aria-label="Switch Sessions" className='mx-auto'
                  onSelectionChange={(key) => handleSessionChange(key)} selectedKey={timerSession.name}>
                {Object.keys(SessionHelper.getAllTypes()).map((key) => (
                    <Tab key={key} title={SessionHelper.getAllTypes()[key].name}/>
                ))}
            </Tabs>
        </div>
    );
}