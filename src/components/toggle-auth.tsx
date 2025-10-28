'use client'

import {useRouter} from 'next/navigation';
import {use, useTransition} from 'react';
import {useIsAuthenticated} from "@/src/provider/auth-provider";

/**
 * A client component that renders a *single button* to toggle Draft Mode.
 * It reads the current state from the useDraftMode() hook.
 */
const ToggleAuth = () => {
    const router = useRouter();

    const {isAuthenticated: isAuthenticatedPromise} = useIsAuthenticated();
    const isAuthenticated = use(isAuthenticatedPromise)

    const [isPending, startTransition] = useTransition();

    /**
     * Handles the API call to toggle the draft mode state.
     */
    const handleToggle = async () => {

        // Determine the *new* state we want to set
        const newState = isAuthenticated ? 'remove' : 'set';

        try {
            const apiUrl = `/api/auth?auth-cookie=${newState}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
            });

            if (response.ok) {
                // Use startTransition for the router refresh
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    };

    // Dynamically set button text and styling
    const buttonText = isAuthenticated ? '🛑 Log Out' : '🚀 Log In';

    return (

        <button
            onClick={handleToggle}
            disabled={isPending}
        >
            {isPending ? (
                <span>Processing...</span>
            ) : (buttonText)}
        </button>


    );
};

export default ToggleAuth;
