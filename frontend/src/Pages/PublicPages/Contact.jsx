import React, { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="font-Publica  flex flex-col md:flex-row ">
      <div className="flex-1 bg-secondary text-white flex flex-col justify-center items-center p-2 md:p-2 relative bg-cover bg-center">
        <h1 className="text-3xl md:text-6xl mt-4  lg:mt-0 font-bold relative text-center md:text-left">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-center relative px-4">
          We'd love to hear from you! Please reach out with any questions or comments you may have.
        </p>
      </div>
      <div className="flex-1 p-12 px-16 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Get in Touch</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            id="message"
            label="Message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            required
            isTextArea={true}
          />
          <Button text="Send Message" className="w-full md:w-auto" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
