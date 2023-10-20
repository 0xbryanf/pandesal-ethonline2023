'use client'
import { createContext, useContext, ReactNode, useState } from 'react';

interface LogInContextType {
  isUserSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

const LogInContext = createContext<LogInContextType | undefined>(undefined);

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);

  const signIn = () => {
    setIsUserSignedIn(true);
  };

  const signOut = () => {
    setIsUserSignedIn(false);
  };

  return (
    <LogInContext.Provider value={{ isUserSignedIn, signIn, signOut }}>
      {children}
    </LogInContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(LogInContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
