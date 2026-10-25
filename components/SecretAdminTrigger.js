'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretAdminTrigger({ children }) {
  const router = useRouter();
  const clickTimes = useRef([]);
  const resetTimer = useRef(null);

  function handleClick() {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current.filter((time) => now - time <= 1200), now];

    if (clickTimes.current.length >= 3) {
      clickTimes.current = [];
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
      router.push('/admin');
      return;
    }

    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      clickTimes.current = [];
      resetTimer.current = null;
    }, 1200);
  }

  return (
    <span onClick={handleClick} style={{ userSelect: 'none' }}>
      {children}
    </span>
  );
}
