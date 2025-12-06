'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import SimpleReactLightbox, { SRLWrapper } from 'react-simple-lightbox';

// Importe os estilos do lightbox
import 'react-simple-lightbox/dist/simple-react-lightbox.min.css';

const galleryData = [
  '/assets/img/gallery/gallery-1.jpg',
  '/assets/img/gallery/gallery-2.jpg',
  '/assets/img/gallery/gallery-3.jpg',
  '/assets/img/gallery/gallery-4.jpg',
  '/assets/img/gallery/gallery-5.jpg',
  '/assets/img/gallery/gallery-6.jpg',
  '/assets/img/gallery/gallery-7.jpg',
  '/assets/img/gallery/gallery-8.jpg',
];

export default function Gallery() {
  const options = {
    settings: {
      overlayColor: 'rgba(0,0,0,0.9)',
      boxShadow: 'none',
      disablePanzoom: true
    },
    buttons: {
      showDownloadButton: false,
      showThumbnailsButton: false,
      showFullscreenButton: false
    }
  };

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Galeria de fotos</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <SimpleReactLightbox {...options}>
          <SRLWrapper>
            <div className="row g-0">
              {galleryData.map((imagePath, index) => (
                <div key={index} className="col-lg-3 col-md-4">
                  <div className="gallery-item">
                    <a href={imagePath}>
                      <Image 
                        src={imagePath} 
                        alt={`Galeria ${index + 1}`} 
                        className="img-fluid" 
                        width={400} 
                        height={400} 
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
    </section>
  );
}