import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar.jsx';
import Footer from './Components/Footer.jsx';

import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import Contact from './Pages/Contact.jsx';

const App = () => {
  const [pages] = useState([
    { path: '/', name: 'Home', component: <Home />, icon: 'fas fa-home' },
    { path: '/products', name: 'Products', component: <Products />, icon: 'fas fa-box-open' },
    { path: '/products/:id', name: 'Product Detail', component: <ProductDetail />, icon: 'fas fa-info-circle' },
    { path: '/contact', name: 'Contact', component: <Contact />, icon: 'fas fa-envelope' },
  ]);

  const companyName = "Lumus Lights"; 

  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update body class based on dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-gray-900', 'text-white');
      document.body.classList.remove('bg-white', 'text-black');
    } else {
      document.body.classList.add('bg-white', 'text-black');
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <NavigationBar pages={pages} companyName={companyName} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow pt-16">
          <Routes>
            {pages.map((page) => (
              <Route key={page.path} path={page.path} element={page.component} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
