import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components here
import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import Contact from './Pages/Contact.jsx';

// Basic layout with navigation
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-xl">Lights Store</div>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-yellow-400">Home</a></li>
              <li><a href="/products" className="hover:text-yellow-400">Products</a></li>
              <li><a href="/about" className="hover:text-yellow-400">About</a></li>
              <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          &copy; 2024 Lights Store. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;
