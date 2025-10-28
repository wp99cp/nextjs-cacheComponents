'use client'

import {createContext, ReactNode, useContext} from 'react';

type DraftModeContextType = {
    isEnabled: Promise<boolean>;
};


const DraftModeContext = createContext<DraftModeContextType | null>(null);

/**
 * Custom hook to access the draft mode status.
 * Throws an error if used outside a DraftModeProvider.
 */
export const useIsInDraftMode = () => {
    const context = useContext(DraftModeContext);
    if (context === null) {
        throw new Error('useDraftMode must be used within a DraftModeProvider');
    }
    return context;
};


/**
 * Client component provider that holds the draft mode state.
 * It receives the initial state from a Server Component (like layout.tsx).
 */
export const DraftModeProvider = ({
                                      children,
                                      isEnabled,
                                  }: {
    children: ReactNode;
    isEnabled: Promise<boolean>;
}) => {

    return (
        <DraftModeContext.Provider value={{isEnabled}}>
            {children}
        </DraftModeContext.Provider>
    );
};
