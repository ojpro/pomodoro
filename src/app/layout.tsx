import type { Metadata } from "next";
import React from "react";

import StoreProvider from "@/helpers/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pomodoro App",
    description: "Made for people that what experience best experience",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
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
