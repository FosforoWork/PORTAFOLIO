'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook that returns a boolean indicating whether the component has mounted on the client.
 * This is useful for preventing hydration mismatches when rendering client-only UI or checking browser APIs.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return mounted;
}
