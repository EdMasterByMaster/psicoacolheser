'use client';
import { useEffect } from 'react';
import AOS from 'aos';

export default function AosProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true, // As animações devem acontecer apenas uma vez por elemento
      duration: 600, // Duração da animação
      easing: 'ease-out-cubic' // Efeito da animação
    });
  }, []);

  return <>{children}</>;
}