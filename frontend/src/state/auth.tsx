import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthCtx = { token: string | null; setToken: (t: string | null) => void };
const Ctx = createContext<AuthCtx>({ token: null, setToken: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const value = useMemo(() => ({
    token,
    setToken: (t: string | null) => {
      if (t) localStorage.setItem('token', t);
      else localStorage.removeItem('token');
      setToken(t);
    }
  }), [token]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
