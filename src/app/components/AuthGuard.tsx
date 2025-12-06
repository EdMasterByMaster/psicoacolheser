// apps/frontend/src/app/components/AuthGuard.tsx
"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

// Componente para ser usado em páginas que exigem autenticação
export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o usuário não estiver autenticado, redireciona
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Se não estiver autenticado, não renderiza o conteúdo (evita "piscar")
  if (!isAuthenticated) {
    return null;
  }

  // Se estiver autenticado, renderiza o conteúdo da página
  return <>{children}</>;
}
