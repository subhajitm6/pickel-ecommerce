import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { OrderTracking } from './pages/OrderTracking';
import { Profile } from './pages/Profile';
import { MyOrders } from './pages/orders/MyOrders';
import { OrderDetails } from './pages/orders/OrderDetails';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { SubscriptionSuccess } from './pages/SubscriptionSuccess';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyEmail } from './pages/auth/VerifyEmail';

import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();

  // Hide Navbar/Footer on auth pages for a more immersive experience
  const isAuthPage = [
    '/login', 
    '/register', 
    '/forgot-password', 
    '/reset-password', 
    '/verify-email'
  ].includes(location.pathname);

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-lime selection:text-foreground overflow-x-hidden">
        <ScrollToTop />
        {!isAuthPage && <Navbar />}
        <CartDrawer />
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/track/:id" element={<OrderTracking />} />
            <Route path="/subscribe" element={<SubscriptionPage />} />
            <Route path="/subscribe/success" element={<SubscriptionSuccess />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </AnimatePresence>
        
        {!isAuthPage && <Footer />}
      </div>
    </ReactLenis>
  );
}

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
