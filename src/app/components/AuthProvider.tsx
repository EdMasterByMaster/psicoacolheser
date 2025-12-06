// apps/frontend/src/app/components/AuthProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../constants'; // Importa a URL base

// 1. Definição do tipo do Contexto
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  // A função login faz a chamada POST para o backend
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Componente Provedor
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Carregar token do localStorage (executa apenas no cliente)
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Credenciais inválidas.' };
      }

      const data = await response.json();
      const newToken = data.token; // O backend retorna o token JWT
      
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      router.push('/dashboard'); // Redireciona para a página protegida
      return { success: true };
    } catch (error) {
      console.error('Erro de login:', error);
      return { success: false, error: 'Erro de conexão com o servidor ou de rede.' };
    }
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setToken(null);
    router.push('/login'); // Redireciona para a página de login
  }, [router]);

  if (loading) {
    // Retorna null ou um spinner enquanto verifica o token inicial
    return null; 
  }

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}