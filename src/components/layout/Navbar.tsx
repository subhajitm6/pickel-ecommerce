import { ShoppingCart, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { cartCount, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (isHome) {
        const sections = ['home', 'products', 'process', 'testimonials', 'contact'];
        let currentSection = 'home';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              currentSection = section;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Handle hash changes on mount if not on home
  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [isHome, location.hash]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Shop' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-background/80 backdrop-blur-md border-b border-pickle/20 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-2 outline-none">
              <span className="text-2xl font-black text-pickle">The Golden Jar.</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 relative">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative font-medium transition-colors ${activeSection === link.id ? 'text-pickle' : 'text-foreground hover:text-pickle'}`}
                >
                  {link.label}
                  {activeSection === link.id && isHome && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-pickle"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-mango p-0.5 overflow-hidden ring-2 ring-transparent group-hover:ring-pickle transition-all">
                    <img src={user?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email}`} alt="Profile" className="w-full h-full rounded-full object-cover bg-cream" />
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="hidden md:flex items-center font-bold text-brown hover:text-pickle transition-colors">
                  Sign In
                </Link>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground hover:text-pickle transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-chili text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-3xl font-light text-foreground hover:text-pickle">
                  &times;
                </button>
              </div>
              <div className="flex flex-col space-y-6 mt-12 text-3xl font-bold">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={`/#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`transition-colors ${activeSection === link.id ? 'text-pickle' : 'text-foreground hover:text-pickle'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-6 mt-6 border-t border-mango/20">
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-pickle hover:text-brown transition-colors block mb-4">
                        My Profile
                      </Link>
                      <Link to="/my-orders" onClick={() => setIsMobileMenuOpen(false)} className="text-pickle hover:text-brown transition-colors block">
                        My Orders
                      </Link>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-pickle hover:text-brown transition-colors block">
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
