import { Instagram, Facebook, Twitter, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-[#740A03] text-cream pt-20 pb-10 rounded-t-[3rem] relative overflow-hidden mt-12">
      {/* Floating Decorative Spices (Background) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-white/10"
      >
        <Leaf size={64} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 text-white/10"
      >
        <Leaf size={80} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/3 text-white/5"
      >
        <Leaf size={48} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Story */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-3xl font-black text-mango mb-6 hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all cursor-default">The Golden Jar.</h3>
            <p className="text-cream/90 mb-8 leading-relaxed font-medium">
              Handcrafted authentic Indian pickles made with love, tradition, and the finest ingredients. Bringing generations of flavor to your table.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-cream hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-cream hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-cream hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-4 font-medium">
              <li><Link to="/#home" onClick={(e) => scrollToSection(e as any, 'home')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Home</Link></li>
              <li><Link to="/my-orders" className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">My Orders</Link></li>
              <li><Link to="/#process" onClick={(e) => scrollToSection(e as any, 'process')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Our Process</Link></li>
              <li><Link to="/#testimonials" onClick={(e) => scrollToSection(e as any, 'testimonials')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Testimonials</Link></li>
              <li><Link to="/#faq" onClick={(e) => scrollToSection(e as any, 'faq')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white tracking-wide">Categories</h4>
            <ul className="space-y-4 font-medium">
              <li><Link to="/#collections" onClick={(e) => scrollToSection(e as any, 'collections')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Mango Series</Link></li>
              <li><Link to="/#collections" onClick={(e) => scrollToSection(e as any, 'collections')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Spicy Collection</Link></li>
              <li><Link to="/#collections" onClick={(e) => scrollToSection(e as any, 'collections')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Sweet & Sour</Link></li>
              <li><Link to="/#collections" onClick={(e) => scrollToSection(e as any, 'collections')} className="text-cream/80 hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Gift Boxes</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white tracking-wide">Stay Spicy</h4>
            <p className="text-cream/90 mb-6 font-medium">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-cream/10 border border-cream/20 rounded-xl px-5 py-3 w-full focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango text-white placeholder:text-cream/50 transition-all font-medium"
              />
              <button 
                type="submit" 
                className="bg-mango text-brown font-black px-6 py-3 rounded-xl hover:bg-white hover:shadow-[0_0_15px_rgba(255,197,51,0.6)] transition-all whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/70 font-medium">
            &copy; {new Date().getFullYear()} Spice&Co. All rights reserved.
          </p>
          <div className="flex space-x-8 font-medium text-cream/70">
            <a href="#" className="hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-mango hover:drop-shadow-[0_0_8px_rgba(255,197,51,0.8)] transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
