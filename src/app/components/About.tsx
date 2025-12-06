import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4 gx-5">
          <div
            className="col-lg-6 position-relative align-self-start"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Image
              src="/assets/img/about.jpg"
              className="img-fluid"
              alt="Imagem sobre a clínica"
              width={600}
              height={400}
            />
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              className="glightbox pulsating-play-btn"
            ></a>
          </div>

          <div
            className="col-lg-6 content"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3>Sobre nós</h3>
            <p>
              O PsicoAcolheSer é um espaço que nasceu do propósito de tornar o
              cuidado psicológico acessível, ético e humanizado, reconhecendo a
              complexidade das histórias, dos vínculos e dos contextos que
              moldam cada indivíduo. Somos uma rede de profissionais
              comprometidos com a escuta, a empatia e o desenvolvimento humano,
              que acreditam que cuidar da mente é cuidar da vida em todas as
              suas dimensões.
            </p>
            <ul>
              <li>
                <i className="fa-solid fa-seedling text-green-600 text-2xl mt-1"></i>
                <div>
                  <h5>Missão</h5>
                  <p>
                    Nossa missão é ensinar o indivíduo a reconhecer, compreender
                    e cuidar de seus traumas e emoções, desenvolvendo novas
                    formas de se relacionar consigo mesmo e com o mundo.
                  </p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-eye text-blue-600 text-2xl mt-1"></i>
                <div>
                  <h5>Visão</h5>
                  <p>
                    Ser reconhecido como uma referência em cuidado psicológico
                    humanizado e acessível, capaz de integrar ciência,
                    sensibilidade e responsabilidade social.
                  </p>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-hand-holding-heart text-pink-600 text-2xl mt-1"></i>
                <div>
                  <h5>Valores</h5>
                  <p>
                    Acolhimento, ética, acessibilidade, humanização,
                    diversidade, autoconhecimento e compromisso social.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
