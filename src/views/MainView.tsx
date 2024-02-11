"use client";

import {NextUIProvider} from "@nextui-org/system";
import SessionTabs      from "@/components/SessionTabs";
import Timer            from "@/components/Timer";
import {useState}       from "react";

export default function MainView() {
    const [sessionType, setSessionType] = useState('pomodoro');

    return (<>
        <NextUIProvider>
            <main className="w-full min-h-screen bg-[url(/images/bg-nature.jpg)] bg-gray-200">
                <header>
                    <SessionTabs onChange={(value: string) => setSessionType(value)}/>
                </header>

                <div className="relative text-center h-[60vh]">
                    <Timer sessionType={sessionType}/>
                </div>
            </main>
        </NextUIProvider>
    </>);
}