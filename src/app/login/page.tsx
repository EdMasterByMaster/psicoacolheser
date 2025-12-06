// apps/frontend/src/app/login/page.tsx
'use client'; // Esta página agora precisa ser 'client' para usar o hook

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import { AuthForm } from '../components/AuthForm';
import { AuthLayout } from '../components/AuthLayout';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Se estiver autenticado, renderiza null enquanto redireciona
  if (isAuthenticated) {
    return null; 
  }

  // Se não, mostra o formulário de login
  return (
    <AuthLayout>
      <AuthForm />
    </AuthLayout>
  );
}