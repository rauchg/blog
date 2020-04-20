import { useState, useEffect } from 'react';

export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setMounted(true);
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // });
  useEffect(() => setMounted(true), []);

  return mounted;
}
