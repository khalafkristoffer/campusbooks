// src/components/ContactPage.jsx
import React, { useState } from 'react';
import Button from './Button';
import '../styles/global.css';
import '../styles/contact-page.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to a backend API
    // For now, we'll just simulate a successful submission
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container page-content">
      <h1>Kontakt</h1>
      
      <div className="contact-grid">
        <div className="contact-info">
          <h2>Kontaktinformation</h2>
          <p>Har du frågor eller förslag? Kontakta oss gärna!</p>
          
          <div className="contact-method">
            <h3>E-post</h3>
            <p>info@chalmershelf.se</p>
          </div>
          
          <div className="contact-method">
            <h3>Sociala medier</h3>
            <p>Följ oss på Instagram och Facebook: @chalmershelf</p>
          </div>
          
          <div className="contact-method">
            <h3>Campus</h3>
            <p>Du kan hitta oss på Chalmers Student Union under terminens öppettider.</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Skicka meddelande</h2>
          {submitStatus === 'success' && (
            <div className="success-message">
              Tack för ditt meddelande! Vi återkommer så snart som möjligt.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Namn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Ämne</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Meddelande</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <Button type="submit" className="button-primary">
              Skicka
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;