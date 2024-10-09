import React from 'react';
import Button from '../ui/Button';

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Heading with Background Image */}
      <div 
        className="flex-1 bg-primary text-white flex flex-col justify-center items-center p-2 md:p-2 relative bg-cover bg-center"

      >
        <h1 className="text-3xl md:text-6xl font-bold  relative text-center md:text-left">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-center relative ">
          We'd love to hear from you! Please reach out with any questions or comments you may have.
        </p>
      </div>

      {/* Right Side - Contact Form */}
      <div className="flex-1 p-10 md:p-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Get in Touch</h2>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission here
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>

          <Button text="Send Message" className="w-full md:w-auto" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
