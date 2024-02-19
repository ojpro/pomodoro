"use client";

import CountdownTimer from "@/components/CountdownTimer";
import SessionTabs from "@/components/SessionTabs";
import { useAppDispatch, useAppSelector } from "@/hooks/states";
import { toggleFullScreen } from "@/lib/utils";
import { setIsPreferencesModalOpen } from "@/states/settings";
import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/system";
import { Tooltip } from "@nextui-org/tooltip";
import { Bolt, Fullscreen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PreferencesView from "./PreferencesView";

export default function MainView() {

    const dispatch = useAppDispatch();
    const isPreferencesModalOpen = useAppSelector(state => state.settings.isPreferencesModalOpen);

    return (<>
        <NextUIProvider>
            <main className="min-w-[100svw] overflow-x-hidden min-h-svh bg-[url(/images/backgrounds/bg-nature-6.jpg)] bg-no-repeat bg-cover bg-black relative">

                <header className='relative'>
                    {/* Sessions Switcher */}
                    <SessionTabs />
                </header>

                {/* Countdown Timer */}
                <div className="relative text-center h-[60vh]">
                    <CountdownTimer />
                </div>

                {/*  Footer | Settings */}
                <footer className="absolute inset-x-0 bottom-0 py-4 px-12 flex flex-row justify-start items-center">
                    <Link href="https://discord.gg/NdxHRGpUV7">
                        <Image src='/images/join-discord.png' width={180} height={60} alt="Join our Discord Server" />
                    </Link>
                    {/* Action Buttons */}
                    <div className="ml-auto flex flex-row justify-center items-center gap-4">
                        {/* Toggle Fullscreen */}
                        <Tooltip content='Toggle Fullscreen' delay={500}>
                            <Button isIconOnly onClick={toggleFullScreen}>
                                <Fullscreen />
                            </Button>
                        </Tooltip>

                        {/* Open Preferences Modal */}
                        <Tooltip content='Open Preferences' delay={500}>
                            <Button isIconOnly onClick={() => dispatch(setIsPreferencesModalOpen(!isPreferencesModalOpen))}>
                                <Bolt />
                            </Button>
                        </Tooltip>
                    </div>
                </footer>

                {/* Preferences */}
                <PreferencesView></PreferencesView>
            </main>
        </NextUIProvider>
    </>);
}