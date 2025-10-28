'use client'

import {useRouter} from 'next/navigation';
import {use, useTransition} from 'react';
import {useIsInDraftMode} from "@/src/provider/draft-mode-provider";

/**
 * A client component that renders a *single button* to toggle Draft Mode.
 * It reads the current state from the useDraftMode() hook.
 */
const ToggleDraftMode = () => {
    const router = useRouter();

    const {isEnabled: isEnabledPromise} = useIsInDraftMode();
    const isEnabled = use(isEnabledPromise)

    const [isPending, startTransition] = useTransition();

    /**
     * Handles the API call to toggle the draft mode state.
     */
    const handleToggle = async () => {

        // Determine the *new* state we want to set
        const newState = isEnabled ? 'disable' : 'enable';

        try {
            const apiUrl = `/api/draft-mode?state=${newState}`;
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
    const buttonText = isEnabled ? '🛑 Disable Draft Mode' : '🚀 Enable Draft Mode';

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

export default ToggleDraftMode;
