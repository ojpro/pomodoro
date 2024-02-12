import React           from "react";
import type {Metadata} from "next";

import "./globals.css";
import StoreProvider   from "@/helpers/StoreProvider";

export const metadata: Metadata = {
    title: "Pomodoro App",
    description: "Made for people that what experience best experience",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}
