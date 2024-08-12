import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar.jsx';
import Footer from './components/Footer.jsx';

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

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavigationBar pages={pages} companyName={companyName} />
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
