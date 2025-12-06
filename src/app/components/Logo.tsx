// apps/frontend/components/Logo.tsx
import Image from 'next/image';

interface LogoProps {
  src: string;
  alt: string;
  className?: string; // 1. Adicionamos a className opcional
}

export function Logo({ src, alt, className }: LogoProps) {
  // 2. Removemos o <div className="flex justify-center mb-6">
  //    Agora, o componente que chama o Logo controla o layout.
  return (
    <Image 
      src={src} 
      alt={alt} 
      width={96} // O Next.js usa isso para evitar "layout shift"
      height={96} 
      className={className} // 3. Aplicamos a className recebida
    />
  );
}