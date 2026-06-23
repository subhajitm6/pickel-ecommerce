import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Package, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export function OrderSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful order
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
      {/* Confetti Animation Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, y: '100vh', x: '50vw' }}
          animate={{ 
            y: '-100vh', 
            x: `${Math.random() * 100}vw`,
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className={`absolute w-3 h-3 rounded-sm ${['bg-mango', 'bg-pickle', 'bg-chili', 'bg-fresh'][i % 4]}`}
        />
      ))}

      <div className="max-w-2xl w-full mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-32 h-32 bg-pickle rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(255,122,0,0.4)]"
        >
          <Check size={64} className="text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-brown mb-4"
        >
          Order Confirmed!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-brown/70 font-medium mb-12"
        >
          Thank you for choosing Spice&Co. Your order #SPICE-8492 is being prepared.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/20 max-w-md mx-auto mb-10"
        >
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-mango/10">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center">
              <Package className="text-pickle" size={32} />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-brown/60 uppercase tracking-wider mb-1">Expected Delivery</div>
              <div className="text-xl font-black text-brown">Thursday, Nov 24</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <Link to="/my-orders" className="w-full bg-brown text-cream font-black py-4 rounded-xl hover:bg-mango hover:text-brown transition-colors shadow-lg flex justify-center items-center gap-2">
              View My Orders <ArrowRight size={20} />
            </Link>
            <Link to="/" className="w-full bg-cream text-brown font-black py-4 rounded-xl border border-mango/20 hover:border-mango transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
