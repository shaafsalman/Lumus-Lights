import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import Contact from './Pages/Contact.jsx';
import ProductMainPage from './Pages/Components/ProductMainPage.jsx';
import NavigationBar from './Pages/Components/NavigationBar.jsx';
import Footer from './Pages/Components/Footer.jsx';



import { useDarkMode,DarkModeProvider } from './Util/DarkModeContext.jsx';
import { faHome, faBoxOpen,faLightbulb, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AppContent = ({ pages, companyName }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`flex flex-col  overflow-x-hidden min-h-screen ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'}`}>
      <NavigationBar pages={pages} companyName={companyName} />
      <main className="flex-grow pt-16">
        <Routes>
          {pages.map((page) => (
            <Route key={page.path} path={page.path} element={page.component} />
          ))}
        </Routes>
      </main>
      <Footer pages={pages} companyName={companyName} />
    </div>
  );
};

const App = () => {
  const [pages] = useState([
    { path: '/', name: 'Home', component: <Home />, icon: faHome },
    { path: '/products', name: 'Products', component: <Products />, icon: faLightbulb },
    { path: '/products/:id', name: 'Product Detail', component: <ProductDetail />, icon: faInfoCircle },
    { path: '/contact', name: 'Contact', component: <Contact />, icon: faEnvelope },
    { path: '/product-main-page', name: 'Product', component: <ProductMainPage />, icon: faEnvelope },
  ]);
  const [NavPages] = useState([
    { path: '/', name: 'Home', component: <Home />, icon: faHome },
    { path: '/products', name: 'Products', component: <Products />, icon: faLightbulb },
    { path: '/contact', name: 'Contact', component: <Contact />, icon: faEnvelope },
    
  ]);

  const companyName = "Lumus Lights";

  return (
    <DarkModeProvider>
      <Router>
        <AppContent pages={pages} companyName={companyName} />
      </Router>
    </DarkModeProvider>
  );
};

export default App;
