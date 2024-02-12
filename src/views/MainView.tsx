"use client";

import {NextUIProvider}                                                  from "@nextui-org/system";
import SessionTabs                                                       from "@/components/SessionTabs";
import Timer                                                             from "@/components/Timer";
export default function MainView() {

    return (<>
        <NextUIProvider>
            <main className="w-full min-h-screen bg-[url(/images/bg-nature.jpg)] bg-gray-200">

                <header className='relative'>
                    {/* Sessions Switcher */}
                    <SessionTabs/>
                </header>

                <div className="relative text-center h-[60vh]">
                    <Timer/>
                </div>
            </main>
        </NextUIProvider>
    </>);
}