'use client';
import Image from 'next/image';
import React from 'react';

// Instale com: npm install swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Importe os estilos do Swiper, que devem ser carregados globalmente no seu layout.tsx
import 'swiper/css';
import 'swiper/css/pagination';

const testimonialsData = [
  {
    image: '/assets/img/testimonials/testimonials-1.jpg',
    name: 'Saul Goodman',
    role: 'Ceo & Founder',
    quote: 'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.'
  },
  {
    image: '/assets/img/testimonials/testimonials-2.jpg',
    name: 'Sara Wilsson',
    role: 'Designer',
    quote: 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.'
  },
  {
    image: '/assets/img/testimonials/testimonials-3.jpg',
    name: 'Jena Karlis',
    role: 'Store Owner',
    quote: 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.'
  },
  {
    image: '/assets/img/testimonials/testimonials-4.jpg',
    name: 'Matt Brandon',
    role: 'Freelancer',
    quote: 'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.'
  },
  {
    image: '/assets/img/testimonials/testimonials-5.jpg',
    name: 'John Larson',
    role: 'Entrepreneur',
    quote: 'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 info" data-aos="fade-up" data-aos-delay="100">
            <h3>Depoimentos</h3>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="200">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              speed={600}
              autoplay={{ delay: 5000 }}
              slidesPerView="auto"
              pagination={{ clickable: true }}
              className="swiper"
            >
              {testimonialsData.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonial-item">
                    <div className="d-flex">
                      <Image 
                        src={testimonial.image} 
                        className="testimonial-img flex-shrink-0" 
                        alt={testimonial.name}
                        width={90}
                        height={90}
                      />
                      <div>
                        <h3>{testimonial.name}</h3>
                        <h4>{testimonial.role}</h4>
                        <div className="stars">
                          <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                        </div>
                      </div>
                    </div>
                    <p>
                      <i className="bi bi-quote quote-icon-left"></i>
                      <span>{testimonial.quote}</span>
                      <i className="bi bi-quote quote-icon-right"></i>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}