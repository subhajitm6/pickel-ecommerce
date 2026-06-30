import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export function Checkout() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isLoading, setIsLoading] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-brown mb-6">Your cart is empty</h1>
        <Link to="/" className="bg-mango text-brown font-black px-8 py-4 rounded-full hover:bg-pickle hover:text-white transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      try {
        await addOrder({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.product?.title || 'Product',
            price: Number(item.product?.price) || 0,
            quantity: item.quantity,
            color: 'from-yellow-200 to-orange-200'
          })),
          subtotal: cartTotal,
          shipping: 0,
          total: cartTotal,
          paymentMethod: paymentMethod,
          shippingAddress: {
            firstName: 'Current',
            lastName: 'User',
            address: '123 Pickle Ave',
            city: 'Mumbai',
            postalCode: '400001',
            phone: '+91 98765 43210'
          },
          deliveryMethod: 'Standard'
        });
        clearCart();
        navigate('/success');
      } catch (error) {
        console.error('Checkout failed', error);
        Swal.fire({
          title: 'Checkout Failed',
          text: 'There was an issue processing your order. Please try again.',
          icon: 'error',
          confirmButtonColor: '#5c3a21',
          customClass: {
            popup: 'rounded-3xl',
            confirmButton: 'rounded-full px-6 py-2 font-bold'
          }
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 bg-cream min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        
        {/* Left: Form */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-mango/20 -z-10 -translate-y-1/2" />
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-colors ${step >= i ? 'bg-pickle text-white shadow-lg' : 'bg-white text-brown/40 border border-mango/20'}`}>
                {i}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10">
            <h2 className="text-3xl font-black text-brown mb-8">
              {step === 1 ? 'Shipping Address' : step === 2 ? 'Delivery Method' : 'Payment'}
            </h2>
            
            <form onSubmit={handleNext}>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" required placeholder="First Name" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                    <input type="text" required placeholder="Last Name" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                  </div>
                  <input type="text" required placeholder="Address" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" required placeholder="City" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                    <input type="text" required placeholder="Postal Code" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                  </div>
                  <input type="tel" required placeholder="Phone Number" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <label className="flex items-center justify-between p-6 border-2 border-pickle bg-pickle/5 rounded-2xl cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="delivery" defaultChecked className="w-5 h-5 text-pickle" />
                      <div>
                        <div className="font-bold text-brown text-lg">Standard Delivery</div>
                        <div className="text-brown/60 font-medium">3-5 Business Days</div>
                      </div>
                    </div>
                    <span className="font-black text-pickle">Free</span>
                  </label>
                  <label className="flex items-center justify-between p-6 border-2 border-mango/20 hover:border-mango bg-white rounded-2xl cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="delivery" className="w-5 h-5 text-pickle" />
                      <div>
                        <div className="font-bold text-brown text-lg">Express Delivery</div>
                        <div className="text-brown/60 font-medium">1-2 Business Days</div>
                      </div>
                    </div>
                    <span className="font-black text-brown">₹149.99</span>
                  </label>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="flex items-center gap-2 text-fresh font-bold mb-4 bg-fresh/10 p-4 rounded-xl">
                    <ShieldCheck /> 256-bit Secure SSL Checkout
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Credit Card', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method) => (
                      <div 
                        key={method} 
                        onClick={() => setPaymentMethod(method)}
                        className={`p-4 rounded-xl border-2 cursor-pointer font-bold text-center transition-all ${paymentMethod === method ? 'border-pickle text-pickle bg-pickle/5 shadow-md' : 'border-mango/20 text-brown hover:border-mango'}`}
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                  {paymentMethod === 'Credit Card' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mt-6">
                      <input type="text" required placeholder="Card Number" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" required placeholder="MM/YY" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                        <input type="text" required placeholder="CVC" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'UPI' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mt-6">
                      <div className="relative">
                        <input type="text" required placeholder="Enter UPI ID (e.g. username@bank)" className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brown/40 font-bold">@upi</span>
                      </div>
                      <p className="text-sm text-brown/60 font-medium">You will receive a payment request on your UPI app.</p>
                    </motion.div>
                  )}

                  {paymentMethod === 'Net Banking' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mt-6">
                      <select required className="w-full bg-background border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown appearance-none cursor-pointer">
                        <option value="" disabled selected>Select Your Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="other">Other Banks</option>
                      </select>
                      <p className="text-sm text-brown/60 font-medium">You will be securely redirected to your bank's portal.</p>
                    </motion.div>
                  )}

                  {paymentMethod === 'Cash on Delivery' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-pickle/5 border-2 border-pickle/20 rounded-xl">
                      <p className="text-sm text-brown font-bold flex items-center gap-2">
                        <ShieldCheck size={18} className="text-pickle" /> Pay securely in cash or via UPI when your order arrives.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              <div className="mt-10 flex justify-between">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="font-bold text-brown/60 hover:text-brown px-6 py-3" disabled={isLoading}>
                    Back
                  </button>
                )}
                <button type="submit" disabled={isLoading} className="ml-auto bg-brown text-cream font-black px-10 py-4 rounded-xl hover:bg-mango hover:text-brown transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Processing...' : (step === 3 ? 'Place Order' : 'Continue')} {!isLoading && <ArrowRight size={20} />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10 sticky top-24">
            <h3 className="text-2xl font-black text-brown mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative flex-shrink-0 w-16 h-16">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-yellow-200 to-orange-200 overflow-hidden flex items-center justify-center">
                      <img src={item.product?.image || 'https://via.placeholder.com/64'} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-brown text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-brown text-sm leading-tight">{item.product?.title || 'Product'}</h4>
                    <div className="text-pickle font-black mt-1">₹{((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-mango/20 pt-4 space-y-3 font-medium text-brown/70">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="text-brown font-bold">₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-pickle font-bold">Free</span>
              </div>
            </div>
            
            <div className="border-t border-mango/20 mt-4 pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-brown">Total</span>
              <span className="text-3xl font-black text-brown">₹{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
