import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div 
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        />
      )}
      {isCartOpen && (
        <motion.div
          key="drawer"
          initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[70] flex flex-col border-l border-mango/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-mango/20">
              <h2 className="text-2xl font-black text-brown flex items-center gap-2">
                <ShoppingBag className="text-pickle" /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-brown/60 hover:text-pickle transition-colors rounded-full hover:bg-mango/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-brown/50 mt-20 flex flex-col items-center">
                  <ShoppingBag size={64} className="mb-4 opacity-50" />
                  <p className="text-xl font-bold">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-pickle font-bold hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white p-4 rounded-2xl border border-mango/10 shadow-sm"
                  >
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} flex-shrink-0`} />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-brown">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-chili/60 hover:text-chili"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3 bg-background rounded-full px-2 py-1 border border-mango/20">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-brown hover:text-pickle shadow-sm"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-brown hover:text-pickle shadow-sm"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-pickle">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-mango/20 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brown/70 font-bold text-lg">Subtotal</span>
                  <span className="text-3xl font-black text-brown">₹{cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-mango text-brown font-black py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-pickle hover:text-white transition-all shadow-[0_5px_15px_rgba(255,197,51,0.4)]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
      )}
    </AnimatePresence>
  );
}
