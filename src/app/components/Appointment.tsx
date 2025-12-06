'use client';

import React, { useState } from 'react';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    department: '',
    doctor: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: '',
    sent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      // Exemplo de como enviar os dados para uma API de rota do Next.js
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o agendamento.');
      }

      setFormStatus({ loading: false, error: '', sent: true });
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        department: '',
        doctor: '',
        message: ''
      });
    } catch (error: any) {
      setFormStatus({ loading: false, error: error.message, sent: false });
    }
  };

  return (
    <section id="appointment" className="appointment section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Agendamento</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <form onSubmit={handleSubmit} role="form" className="php-email-form">
          <div className="row">
            <div className="col-md-4 form-group">
              <input type="text" name="name" className="form-control" id="name" placeholder="Seu Nome" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input type="email" className="form-control" name="email" id="email" placeholder="Seu Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <input type="tel" className="form-control" name="phone" id="phone" placeholder="Seu Telefone" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 form-group mt-3">
              <input type="datetime-local" name="date" className="form-control" id="date" placeholder="Data do Agendamento" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="col-md-4 form-group mt-3">
              <select name="department" id="department" className="form-select" value={formData.department} onChange={handleChange} required>
                <option value="">Selecionar Departamento</option>
                <option value="Department 1">Department 1</option>
                <option value="Department 2">Department 2</option>
                <option value="Department 3">Department 3</option>
              </select>
            </div>
            <div className="col-md-4 form-group mt-3">
              <select name="doctor" id="doctor" className="form-select" value={formData.doctor} onChange={handleChange} required>
                <option value="">Selecionar Psicólogo</option>
                <option value="Doctor 1">Psicólogo 1</option>
                <option value="Doctor 2">Psicólogo 2</option>
                <option value="Doctor 3">Psicólogo 3</option>
              </select>
            </div>
          </div>

          <div className="form-group mt-3">
            <textarea className="form-control" name="message" rows={5} placeholder="Mensagem (Opcional)" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className="mt-3">
            {formStatus.loading && <div className="loading">Carregando</div>}
            {formStatus.error && <div className="error-message">{formStatus.error}</div>}
            {formStatus.sent && <div className="sent-message">Sua solicitação de agendamento foi enviada. Obrigado!</div>}
            <div className="text-center">
              <button type="submit" disabled={formStatus.loading}>
                {formStatus.loading ? 'Enviando...' : 'Faça um agendamento'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}