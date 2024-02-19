import type { Metadata } from "next";
import React from "react";

import StoreProvider from "@/helpers/StoreProvider";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pomodoro Pulse: Maximize Your Productivity",
    description: "Designed for Pomodoro enthusiasts aiming for maximum productivity.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <StoreProvider>
            <html lang="en">
                <head>
                    {/* <!-- Google tag (gtag.js) --> */}

                    <Script id='google-analytics-import-script' strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

                    <Script id='google-analytics-script-execution' strategy="lazyOnload">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                     `}
                    </Script>

                    <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
                    <meta name="author" content="Oussama ELJABBARI" />
                    <link rel="manifest" href="/site.webmanifest" />

                    {/* Facebook Meta Tags */}
                    <meta property="og:url" content="https://pomodoropulse.com/" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Pomodoro Pulse: Maximize Your Productivity" />
                    <meta property="og:description" content="Designed for Pomodoro enthusiasts aiming for maximum productivity." />
                    <meta property="og:image" content="/images/ogimage.jpg" />

                    {/* Twitter Meta Tags  */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="pomodoropulse.com" />
                    <meta property="twitter:url" content="https://pomodoropulse.com/" />
                    <meta name="twitter:title" content="Pomodoro Pulse: Maximize Your Productivity" />
                    <meta name="twitter:description" content="Designed for Pomodoro enthusiasts aiming for maximum productivity." />
                    <meta name="twitter:image" content="/images/ogimage.jpg" />

                </head>
                <body>
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}
