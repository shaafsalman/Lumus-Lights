import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useDarkMode, DarkModeProvider } from './Util/DarkModeContext';
import { fetchProducts, fetchCategories,useFetchProducts  } from './Util/fetchers';
import Home from './Pages/PublicPages/Home';
import Products from './Pages/PublicPages/Products';
import ProductDetail from './Pages/PublicPages/ProductDetail';
import Contact from './Pages/PublicPages/Contact';
import Login from './Pages/PublicPages/Login';
import Register from './Pages/PublicPages/Register';
import ProductMainPage from './Components/ProductMainPage';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';


import Sidebar from './Pages/AdminPages/Sidebar';
import ManageCategories from './Pages/AdminPages/ManageCategories';
import ManageProducts from './Pages/AdminPages/ManageProducts';
import ProfileHeader from './ui/ProfileHeader';
import AdminNavbar from './ui/AdminNavbar';
import Dashboard from './Pages/AdminPages/Dashboard.jsx'; 
import BannerPromotion from './Pages/AdminPages/BannerPromotions.jsx';
import PopUpPromotions from './Pages/AdminPages/PopUpPromotions.jsx';



// Helper function to check token validity
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  if (token && tokenExpiry) {
    const currentTime = new Date().getTime();
    return currentTime < tokenExpiry;
  }
  return false;
};

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
    <div className={`font-popins flex flex-col  overflow-hidden ${darkMode ? 'bg-secondary text-white' : 'bg-white text-black'}`}>
      <NavigationBar />
      <main className="flex-grow mt-24">{children}</main>
      <Footer />
    </div>
  );
};

const AdminLayout = ({ children, pageTitle }) => {
  const { darkMode } = useDarkMode();


 
  return (
      <div className={`flex flex-col h-screen ${darkMode ? 'bg-secondary text-white' : 'bg-white text-secondary'}`}>
        <AdminNavbar />
    
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className={`flex-1 px-8 py-5 shadow-2xl  ${darkMode ? 'bg-secondary text-secondary' : 'bg-white text-secondary'}`}>
            <ProfileHeader pageTitle={pageTitle} />
            {children}
          </div>
        </div>
      </div>
    
  );
};

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => (
  isAuthenticated ? children : <Navigate to="/login" />
);

// Admin routes defined separately for easier expansion
const adminRoutes = [
  { path: '/dashboard', component: <Dashboard />, title: 'Dashboard' },
  { path: '/admin/manage-categories', component: <ManageCategories />, title: 'Manage Categories' },
  { path: '/admin/manage-products', component: <ManageProducts />, title: 'Manage Products' },
  { path: '/admin/banner-promotions', component: <BannerPromotion />, title: 'Banner Promotions' },
  { path: '/admin/popups-promotions', component: <PopUpPromotions/>, title: 'PopUp Promotions' },

];

// Main application content
const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const [pageTitle, setPageTitle] = useState("Admin");
  const location = useLocation();

  const routes = [
    { path: '/login', layout: AuthLayout, component: <Login onLogin={() => setIsAuthenticated(true)} /> },
    { path: '/register', layout: AuthLayout, component: <Register /> },
    { path: '/', layout: MainLayout, component: <Home /> },
    { path: '/products', layout: MainLayout, component: <Products /> },
    { path: '/products/:id', layout: MainLayout, component: <ProductDetail /> },
    { path: '/contact', layout: MainLayout, component: <Contact /> },
    { path: '/product-main-page', layout: MainLayout, component: <ProductMainPage /> },
  ];

  // Update page title based on current route
  useEffect(() => {
    const matchedAdminRoute = adminRoutes.find(route => route.path === location.pathname);
    if (matchedAdminRoute) {
      setPageTitle(matchedAdminRoute.title);
    } else {
      setPageTitle("Admin");
    }
  }, [location.pathname]);

  return (
    <Routes>
      {routes.map(({ path, layout: Layout, component }) => (
        <Route key={path} path={path} element={<Layout>{component}</Layout>} />
      ))}

      {adminRoutes.map(({ path, component, title }) => (
        <Route 
          key={path} 
          path={path} 
          element={
            <AdminLayout pageTitle={title}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {component}
              </ProtectedRoute>
            </AdminLayout>
          } 
        />
      ))}

      <Route path="/admin/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

// Main App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTokenValid()) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    const token = 'user-token'; 
    const tokenExpiry = new Date().getTime() + 60 * 60 * 1000; 
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', tokenExpiry);
    setIsAuthenticated(true);
  };

  return (
    <DarkModeProvider>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={handleLogin} />
      </Router>
    </DarkModeProvider>
  );
};

export default App;
