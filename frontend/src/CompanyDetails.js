import { faEnvelope, faHome, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const company = {
  name: "Lumus Lights",
  address: "Lahore, Punjab",
  email: "admin@DataSynth.site",
  contact: {
      phone: "+1 123 456 7890",
      email: "info@datasynth.com",
  },
  socialLinks: {
      facebook: "https://www.facebook.com/datasynth",
      twitter: "https://twitter.com/datasynth",
      linkedin: "https://www.linkedin.com/company/datasynth",
      website: "https://www.datasynth.com",
  },
  pages: [
      { path: '/', name: 'Home', icon: faHome },
      { path: '/products', name: 'Products', icon: faLightbulb },
      { path: '/contact', name: 'Contact', icon: faEnvelope },
  ],
  promotionalMessage: "Welcome to Lumus Lights! Check out our latest offers.",
  promotionMessageActive: true,
  popupAds: [] 
};

const getCompanyName = () => company.name;
const getCompanyAddress = () => company.address;
const getCompanyContact = () => company.contact;
const getCompanySocialLinks = () => company.socialLinks;
const getCompanyEmail = () => company.email;

export {
  company,
  getCompanyName,
  getCompanyAddress,
  getCompanyContact,
  getCompanySocialLinks,
  getCompanyEmail,
};
