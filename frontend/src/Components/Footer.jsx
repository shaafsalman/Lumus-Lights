import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { getCompanyName, company } from '.././CompanyDetails';
import Button from '.././ui/Button';

const Footer = ({ page }) => {
  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: faFacebookF },
    { href: 'https://twitter.com', icon: faTwitter },
    { href: 'https://instagram.com', icon: faInstagram },
    { href: 'https://linkedin.com', icon: faLinkedin }
  ];

  return (
    <div className="flex flex-col p-8 md:p-20 bg-secondary text-white">
      <div className="w-full flex flex-col items-center md:items-start">
        <div className="text-3xl md:text-7xl font-bold text-center md:text-left mb-4 md:mb-6">
          How can we help you get in touch
        </div>
        <div className="flex flex-col md:flex-row md:justify-between w-full text-center md:text-left">
          <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-0 md:w-2/3">
            To ensure that all Wikipedia content is verifiable, anyone may question an uncited claim. If your work has been tagged
          </p>
          <div className="w-full md:w-auto">
            <Button text="Contact Us" className="mx-auto md:mx-0" />
          </div>
        </div>
        <div className="flex flex-col items-center mt-6 md:mt-8 w-full">
          <div className="flex justify-center md:justify-start space-x-4 flex-wrap">
            {company.pages.map((page) => ( 
              <Link 
                key={page.path} 
                to={page.path} 
                className="text-sm md:text-base text-white flex items-center mb-2"
              >
                {page.icon && <FontAwesomeIcon icon={page.icon} className="mr-2" />}
                {page.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            {socialMediaLinks.map(({ href, icon }) => (
              <a 
                key={href} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-gray-300"
              >
                <FontAwesomeIcon icon={icon} size="lg" />
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
