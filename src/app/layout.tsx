import React from "react";
import {DraftModeProvider} from "../provider/draft-mode-provider";
import {cookies, draftMode} from "next/headers";
import {AuthProvider} from "@/src/provider/auth-provider";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const draft = draftMode();
    const isEnabled = draft
        .then(({isEnabled}) => isEnabled)
    const isAuthenticated = cookies()
        .then(cookieStore => cookieStore.get('auth-token')?.value === 'some-secret')

    return (
        <html lang="en">
        <DraftModeProvider isEnabled={isEnabled}>
            <AuthProvider isAuthenticated={isAuthenticated}>
                <body>{children}</body>
            </AuthProvider>
        </DraftModeProvider>
        </html>
    );
}