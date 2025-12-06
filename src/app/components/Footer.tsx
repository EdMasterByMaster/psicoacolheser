import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" className="footer light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <span className="sitename">PsicoAcolheSer</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>Avenida Paulista, 1111</p>
              <p>São Paulo - SP</p>
              <p className="mt-3"><strong>Telefone:</strong> <span>+55 95589-55488</span></p>
              <p><strong>Email:</strong> <span>info@example.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <Link href=""><i className="bi bi-twitter-x"></i></Link>
              <Link href=""><i className="bi bi-facebook"></i></Link>
              <Link href=""><i className="bi bi-instagram"></i></Link>
              <Link href=""><i className="bi bi-linkedin"></i></Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Links Úteis</h4>
            <ul>
              <li><Link href="#">Início</Link></li>
              <li><Link href="#">Sobre nós</Link></li>
              <li><Link href="#">Serviços</Link></li>
              <li><Link href="#">Termos de serviço</Link></li>
              <li><Link href="#">Política de privacidade</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Nossos Serviços</h4>
            <ul>
              <li><Link href="#">Design Web</Link></li>
              <li><Link href="#">Desenvolvimento Web</Link></li>
              <li><Link href="#">Gerenciamento de Produto</Link></li>
              <li><Link href="#">Marketing</Link></li>
              <li><Link href="#">Design Gráfico</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Hic solutasetp</h4>
            <ul>
              <li><Link href="#">Molestiae accusamus iure</Link></li>
              <li><Link href="#">Excepturi dignissimos</Link></li>
              <li><Link href="#">Suscipit distinctio</Link></li>
              <li><Link href="#">Dilecta</Link></li>
              <li><Link href="#">Sit quas consectetur</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Nobis illum</h4>
            <ul>
              <li><Link href="#">Ipsam</Link></li>
              <li><Link href="#">Laudantium dolorum</Link></li>
              <li><Link href="#">Dinera</Link></li>
              <li><Link href="#">Trodelas</Link></li>
              <li><Link href="#">Flexo</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">Medilab</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Distributed by <a href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>
    </footer>
  );
}