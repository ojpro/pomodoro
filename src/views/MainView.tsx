"use client";

import CountdownTimer from "@/components/CountdownTimer";
import SessionTabs from "@/components/SessionTabs";
import { toggleFullScreen } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/system";
import { Tooltip } from "@nextui-org/tooltip";
import { Bolt, Fullscreen } from 'lucide-react';
import { useState } from "react";
import PreferencesView from "./PreferencesView";

export default function MainView() {
    const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

    return (<>
        <NextUIProvider>
            <main className="w-full min-h-screen bg-[url(/images/bg-nature-3.jpg)] bg-gray-200 relative">

                <header className='relative'>
                    {/* Sessions Switcher */}
                    <SessionTabs />
                </header>

                {/* Countdown Timer */}
                <div className="relative text-center h-[60vh]">
                    <CountdownTimer />
                </div>

                {/*  Footer | Settings */}
                <footer className="absolute inset-x-0 bottom-0 py-4 px-12 flex flex-row justify-start align-middle">
                    {/* Action Buttons */}
                    <div className="ml-auto flex flex-row justify-center align-middle gap-4">
                        {/* Toggle Fullscreen */}
                        <Tooltip content='Toggle Fullscreen' delay={500}>
                            <Button isIconOnly onClick={toggleFullScreen}>
                                <Fullscreen />
                            </Button>
                        </Tooltip>

                        {/* Open Preferences Modal */}
                        <Tooltip content='Open Preferences' delay={500}>
                            <Button isIconOnly onClick={() => setIsPreferencesModalOpen(!isPreferencesModalOpen)}>
                                <Bolt />
                            </Button>
                        </Tooltip>
                    </div>
                </footer>

                {/* Components */}

                {/* Preferences */}
                <PreferencesView isOpen={isPreferencesModalOpen} handleChange={setIsPreferencesModalOpen} />

            </main>
        </NextUIProvider>
    </>);
}