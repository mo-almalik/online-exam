'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ContextState = {
  email?: string;
  setEmail: Dispatch<SetStateAction<ContextState['email']>>;
};

const initialState = {
  email: undefined,
  setEmail: () => {},
};

const AuthContext = createContext<ContextState>(initialState);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<ContextState['email']>(initialState.email);

  return <AuthContext.Provider value={{ email, setEmail }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context was used outside of its provider.');

  return context;
}
