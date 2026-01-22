import { ReactNode, useEffect, useState } from 'react';
import { getSupabaseClient } from '../utils/supabase/client';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    supabase.auth.getSession().then(({ data }) => {
      const hasSession = !!data.session;
      setAuthorized(hasSession);
      if (!hasSession) {
        // Soft redirect for now; optionally replace with navigate('/')
        console.warn('[AuthGuard] No session; admin content hidden.');
      }
    });
  }, []);

  if (authorized === null) {
    return <div className="p-6 text-center text-sm text-foreground/60">Ověřování…</div>;
  }

  if (!authorized) {
    return <div className="p-6 text-center text-sm text-foreground/60">Přístup zamítnut. Přihlaste se jako administrátor.</div>;
  }

  return <>{children}</>;
}
