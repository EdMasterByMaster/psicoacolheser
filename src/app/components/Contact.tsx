'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    sent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: '', sent: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a mensagem.');
      }

      setFormStatus({ loading: false, error: '', sent: true });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      setFormStatus({ loading: false, error: error.message, sent: false });
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contato</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.485122100063!2d-46.65751278440742!3d-23.55051936785006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a35d796245%3A0xc3924f0a0c6a51d4!2sAvenida%20Paulista%2C%201111%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001311-200!5e0!3m2!1spt-BR!2sbr!4v1625400000000!5m2!1spt-BR!2sbr" style={{ border: 0, width: '100%', height: '270px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Endereço</h3>
                <p>Avenida 1111, São Paulo - SP</p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Telefone</h3>
                <p>+55 11 95589-55488</p>
              </div>
            </div>
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email</h3>
                <p>info@example.com</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <form onSubmit={handleSubmit} role="form" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Seu Nome" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 ">
                  <input type="email" className="form-control" name="email" placeholder="Seu Email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                  <input type="text" className="form-control" name="subject" placeholder="Assunto" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                  <textarea className="form-control" name="message" rows={6} placeholder="Mensagem" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <div className="col-md-12 text-center">
                  {formStatus.loading && <div className="loading">Carregando</div>}
                  {formStatus.error && <div className="error-message">{formStatus.error}</div>}
                  {formStatus.sent && <div className="sent-message">Sua mensagem foi enviada. Obrigado!</div>}
                  <button type="submit" disabled={formStatus.loading}>
                    {formStatus.loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}