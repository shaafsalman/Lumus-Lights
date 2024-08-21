import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import Contact from './Pages/Contact.jsx';
import ProductMainPage from './Pages/Components/ProductMainPage.jsx';
import Login from './Pages/login.jsx';
import Dashboard from './Pages/DashBoard.jsx';
import NavigationBar from './Pages/Components/NavigationBar.jsx';
import Footer from './Pages/Components/Footer.jsx';

import { useDarkMode, DarkModeProvider } from './Util/DarkModeContext.jsx';
import { faHome, faBoxOpen, faLightbulb, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AuthLayout = ({ children }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'} min-h-screen flex items-center justify-center`}>
      {children}
    </div>
  );
};

const MainLayout = ({ children, pages, companyName }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'}`}>
      <NavigationBar pages={pages} companyName={companyName} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer pages={pages} companyName={companyName} />
    </div>
  );
};

const AppContent = ({ pages, companyName }) => {
  const [routes] = useState([
    { path: '/login', layout: AuthLayout, component: <Login /> },
    { path: '/dashboard', layout: AuthLayout, component: <Dashboard /> },
    { path: '/', layout: MainLayout, component: <Home /> },
    { path: '/products', layout: MainLayout, component: <Products /> },
    { path: '/products/:id', layout: MainLayout, component: <ProductDetail /> },
    { path: '/contact', layout: MainLayout, component: <Contact /> },
    { path: '/product-main-page', layout: MainLayout, component: <ProductMainPage /> }
  ]);

  return (
    <Routes>
      {routes.map(({ path, layout: Layout, component }) => (
        <Route
          key={path}
          path={path}
          element={<Layout pages={pages} companyName="Lumus Lights">{component}</Layout>}
        />
      ))}
    </Routes>
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

  return (
    <DarkModeProvider>
      <Router>
        <AppContent pages={pages} />
      </Router>
    </DarkModeProvider>
  );
};

export default App;
