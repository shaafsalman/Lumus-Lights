import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from './../../Util/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Button from '../../Cells/Button';

const ContactUs = ({ pages, companyName }) => {
  const { darkMode } = useDarkMode();
  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: faFacebookF },
    { href: 'https://twitter.com', icon: faTwitter },
    { href: 'https://instagram.com', icon: faInstagram },
    { href: 'https://linkedin.com', icon: faLinkedin }
  ];
  
  return (
    <div className={`w-full flex p-10 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className={` w-screen px-4 ${darkMode ? 'text-white' : 'text-black'} flex flex-col`}>
        <div className="w-full text-7xl font-bold">
          <h1 className="w-full md:w-2/3">
            How can we help you get in touch
          </h1>
        </div>
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className={`w-full md:w-2/3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            To ensure that all Wikipedia content is verifiable, anyone may question an uncited claim. If your work has been tagged
          </p>
          <div className="w-44 pt-6 md:pt-0">
            <Button
            text='Contact Us'
            />
          </div>
        </div>
        <div className="flex flex-col">
        <div className="mt-12 flex justify-center space-x-4">
        {pages.map((page) => (
              <div key={page.path}>
                <Link to={page.path} className={`text-base ${darkMode ? 'text-white' : 'text-black'}`}>
                <FontAwesomeIcon icon={page.icon} className="mr-2 text-md" />
                {page.name}
                                </Link>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center space-x-4">
          {socialMediaLinks.map(({ href, icon }) => (
              <a 
                key={href} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-gray-300"
              >
                <FontAwesomeIcon icon={icon} size="2x" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
