// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetail from './Pages/ProductDetail.jsx';
import Contact from './Pages/Contact.jsx';
import ProductMainPage from './Pages/Components/ProductMainPage.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';

import NavigationBar from './Pages/Components/NavigationBar.jsx';
import Footer from './Pages/Components/Footer.jsx';
import { useDarkMode, DarkModeProvider } from './Util/DarkModeContext.jsx';
import Dashboard from './Pages/AdminPages/Dashboard.jsx'; 
import Sidebar from './Pages/AdminPages/Sidebar.jsx';
import ManageCategories from './Pages/AdminPages/ManageCategories.jsx';
import ManageProducts from './Pages/AdminPages/ManageProducts.jsx';

// Layouts
const AuthLayout = ({ children }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'}`}>
      {children}
    </div>
  );
};

const MainLayout = ({ children }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <main className={`flex-1 p-8 overflow-y-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        {children}
      </main>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => (
  isAuthenticated ? children : <Navigate to="/login" />
);

// Admin routes defined separately for easier expansion
const adminRoutes = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/admin/manage-categories', component: <ManageCategories /> },
  { path: '/admin/manage-products', component: <ManageProducts /> },
  // Add more admin pages here in the future
];

// Main application content
const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const routes = [
    { path: '/login', layout: AuthLayout, component: <Login onLogin={() => setIsAuthenticated(true)} /> },
    { path: '/register', layout: AuthLayout, component: <Register /> },
    { path: '/', layout: MainLayout, component: <Home /> },
    { path: '/products', layout: MainLayout, component: <Products /> },
    { path: '/products/:id', layout: MainLayout, component: <ProductDetail /> },
    { path: '/contact', layout: MainLayout, component: <Contact /> },
    { path: '/product-main-page', layout: MainLayout, component: <ProductMainPage /> },
  ];

  return (
    <Routes>
      {/* Regular routes */}
      {routes.map(({ path, layout: Layout, component }) => (
        <Route key={path} path={path} element={<Layout>{component}</Layout>} />
      ))}

      {/* Admin routes */}
      {adminRoutes.map(({ path, component }) => (
        <Route 
          key={path} 
          path={path} 
          element={
            <AdminLayout>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {component}
              </ProtectedRoute>
            </AdminLayout>
          } 
        />
      ))}

      {/* Redirect for /admin path */}
      <Route path="/admin/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

// Main App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <DarkModeProvider>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </DarkModeProvider>
  );
};

export default App;
