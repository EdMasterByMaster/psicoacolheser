// apps/frontend/src/app/components/AuthLayout.tsx
import React from 'react';
import Image from 'next/image'; // 1. Importar o componente Image
import Link from 'next/link';   // 2. Importar o componente Link

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // 3. Alterar para 'flex-col' para empilhar o logo e o formulário
    <div className="flex min-h-screen items-center justify-center bg-blue-900 p-4">
      
      {/* 4. Adicionar o bloco do Logotipo */}
      <div >
        {/* <Link href="/">
          <Image
            // 5. Usar o mesmo caminho do logo do seu Header.tsx
            src="/assets/img/logo_pas.jpeg" 
            alt="Logo PsicoAcolheSer"
            width={70} // Um tamanho bom para a tela de login
            height={70}
            className="mx-auto rounded-full shadow-md" // Estilos para centralizar e arredondar
          />
        </Link> */}
      </div>

      {/* 6. O 'children' (seu AuthForm.tsx) será renderizado aqui */}
      {children}
    </div>
  );
}