import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="hero section light-background">
      <Image src="/assets/img/hero-bg.jpg" alt="Background" fill style={{ objectFit: 'cover' }} />

      <div className="container position-relative">
        <div className="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
          <h2>Bem-vindo ao PsicoAcolheSer</h2>
          <p>A psicoterapia está ao seu alcance.</p>
        </div>

        <div className="content row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
              <h3>Por que escolher PsicoAcolheSer?</h3>
              <p>
                A psicoterapia está ao seu alcance. Agende sua sessão com um psicólogo de forma fácil, rápida e segura. Nós te ajudamos a encontrar o profissional ideal para o seu bem-estar, com a flexibilidade de horários que você precisa. Sua jornada de autoconhecimento e cuidado com a saúde mental começa aqui.
              </p>
              <div className="text-center">
                <Link href="#about" className="more-btn"><span>Saiba Mais</span> <i className="bi bi-chevron-right"></i></Link>
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="d-flex flex-column justify-content-center">
              <div className="row gy-4">
                {/* ... conteúdo dos ícones ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}