import React, { useState } from 'react';
import DetailPageHero from '../components/DetailpageHero';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    // Check if the field is empty
    if (value.trim() === '') {
      errorMessage = 'Fältet får inte vara tomt. Var vänlig och fyll i det.';
    } else {
      // Check if the email is valid
      if (name === 'email' && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        errorMessage = 'Ange en giltig e-postadress.';
      }
      // Check if the name is at least 2 characters long
      if (name === 'name' && value.trim().length < 2) {
        errorMessage = 'Namnet måste vara minst 2 bokstäver långt.';
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any fields are empty
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        newErrors[key] = 'Fältet får inte vara tomt. Var vänlig och fyll i det.';
      }
    });
    setFormErrors(newErrors);

    // Check if any errors exist
    if (Object.values(newErrors).length > 0) {
      setSubmissionMessage('Vänligen kontrollera att alla fält är ifyllda.');
      return;
    }


    // Send data to API
    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // get the response data
      console.log('Response data:', data); // log the response data

      if (response.status === 200) {
        setSubmissionMessage('Meddelandet har skickats.');
        // Clear form data on successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSubmissionMessage('Något gick fel. Försök igen.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmissionMessage('Gick inte att skicka meddelandet. Försök igen.');
    }
  };

  return (
    <>
    <DetailPageHero />
    <div className='contact-container d-flex justify-content-center'>
      <div className='col-12 col-md-6'>
        <div className="border p-4 rounded m-4">
          <h1 className='text-center mb-4'>Kontakta oss</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">För- och efternamn:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
              {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-postadress:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                />
              {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Meddelande:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                />
              {formErrors.message && <div className="text-danger">{formErrors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Skicka</button>

            {submissionMessage && <div className="mt-3 text-success">{submissionMessage}</div>}
          </form>
        </div>
      </div>
    
    </div>
  </>
  );
};

export default ContactForm;