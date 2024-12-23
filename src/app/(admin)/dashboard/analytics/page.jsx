'use client';

// @next
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

/***************************  ANALYTICS  ***************************/

export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/analytics/overview');
  }, [router]);

  return null;
}
