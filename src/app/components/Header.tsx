// apps/frontend/src/app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './AuthProvider'; // 1. Importar o hook de autenticação

export default function Header() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // 2. Obter o estado de autenticação e a função de logout
  const { isAuthenticated, logout } = useAuth();

  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  const toggleDropdown = (e: React.MouseEvent, dropdownId: string) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleLinkClick = () => {
    if (isMobileNavActive) {
      setIsMobileNavActive(false); // Fecha a nav mobile ao clicar em um link
    }
    setActiveDropdown(null); // Fecha qualquer dropdown aberto
  };

  // 3. Criar função de handler para o logout
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    handleLinkClick(); // Fecha menus
  };

  return (
    <header id="header" className="header sticky-top">
      {/* --- Topbar (sem alterações) --- */}
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">contact@example.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <a href="tel:+55119558955488">+55 11 95589-55488</a>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* --- Branding e Navmenu (com alterações) --- */}
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link href="/" className="logo d-flex align-items-center me-auto" onClick={handleLinkClick}>
            <Image src="/assets/img/logo_pas.jpeg" alt="Logo PsicoAcolheSer" className="img-fluid" width={54} height={54} />
            <h1 className="sitename">PsicoAcolheSer</h1>
          </Link>

          <nav id="navmenu" className={`navmenu ${isMobileNavActive ? 'mobile-nav-active' : ''}`}>
            <ul>
              <li><Link href="#hero" className="active" onClick={handleLinkClick}>Início</Link></li>
              <li><Link href="#about" onClick={handleLinkClick}>Sobre</Link></li>
              <li><Link href="#services" onClick={handleLinkClick}>Serviços</Link></li>
              <li><Link href="#doctors" onClick={handleLinkClick}>Equipe</Link></li>

              {/* 4. AJUSTE: Link de Agendamento dinâmico */}
              <li>
                <Link 
                  href={isAuthenticated ? '/dashboard' : '/login'} 
                  onClick={handleLinkClick}
                >
                  Agendamento
                </Link>
              </li>

              {/* 5. AJUSTE: Dropdown dinâmico (Minha Conta ou nada) */}
              {isAuthenticated ? (
                // Se LOGADO, mostrar "Minha Conta"
                <li className={`dropdown ${activeDropdown === 'user-dropdown' ? 'dropdown-active' : ''}`}>
                  <a href="#" onClick={(e) => toggleDropdown(e, 'user-dropdown')}>
                    <span>Minha Conta</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul className={`${activeDropdown === 'user-dropdown' ? 'dropdown-active' : ''}`}>
                    <li><Link href="/dashboard" onClick={handleLinkClick}>Meu Painel</Link></li>
                    <li><a href="#" onClick={handleLogout}>Sair</a></li>
                  </ul>
                </li>
              ) : (
                // Se DESLOGADO, não mostrar o dropdown
                <></>
              )}
              
              <li><Link href="#contact" onClick={handleLinkClick}>Contato</Link></li>
            </ul>
            <i 
              className={`mobile-nav-toggle d-xl-none bi ${isMobileNavActive ? 'bi-x' : 'bi-list'}`}
              onClick={toggleMobileNav}
            ></i>
          </nav>

          {/* 6. AJUSTE PRINCIPAL: Botão CTA dinâmico */}
          {isAuthenticated ? (
            // Se LOGADO, o botão leva ao painel
            <Link className="cta-btn d-none d-sm-block" href="/dashboard" onClick={handleLinkClick}>
              Meu Painel
            </Link>
          ) : (
            // Se DESLOGADO, o botão solicita o login
            <Link className="cta-btn d-none d-sm-block" href="/login" onClick={handleLinkClick}>
              Entrar / Agendar
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}