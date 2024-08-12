import React from 'react';
import Button from '../Cells/Button';
import image from '../assets/contact-us.png';

const Contact = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Heading with Background Image */}
      <div className="flex-1 relative bg-primary text-white flex flex-col justify-center items-center p-10">

        <h1 className="text-4xl font-bold mb-4 relative z-10">Contact Us</h1>
        <p className="text-lg text-center relative z-10">
          We'd love to hear from you! Please reach out with any questions or comments you may have.
        </p>
      </div>

      {/* Right Side - Contact Form */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
        <form
          className="space-y-4"
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

          <Button text="Send Message" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
