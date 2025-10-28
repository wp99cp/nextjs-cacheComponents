'use client'

import {createContext, ReactNode, useContext} from 'react';

type AuthContextType = {
    isAuthenticated: Promise<boolean>;
};


const AuthContext = createContext<AuthContextType | null>(null);


export const useIsAuthenticated = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useDraftMode must be used within a DraftModeProvider');
    }
    return context;
};


export const AuthProvider = ({
                                 children,
                                 isAuthenticated,
                             }: {
    children: ReactNode;
    isAuthenticated: Promise<boolean>;
}) => {

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
