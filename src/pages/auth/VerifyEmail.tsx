import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export function VerifyEmail() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    // Mock verification sequence
    const timer = setTimeout(() => {
      setStatus('success');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-mango/20 max-w-lg w-full text-center relative overflow-hidden"
      >
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pickle/5 to-transparent" />
        
        <div className="relative z-10">
          {status === 'verifying' && (
            <motion.div 
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-mango/30 border-t-mango"
                />
                <Mail className="w-10 h-10 text-brown" />
              </div>
              <h2 className="text-3xl font-black text-brown mb-4">Verifying Email</h2>
              <p className="text-brown/60 font-medium">Please wait while we securely verify your email address...</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div 
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="w-24 h-24 bg-fresh/10 rounded-full flex items-center justify-center mb-8 text-fresh shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h2 className="text-3xl font-black text-brown mb-4">Email Verified!</h2>
              <p className="text-brown/60 font-medium mb-10">
                Your account is now fully active. Get ready to experience the finest handcrafted flavors.
              </p>
              
              <Link 
                to="/"
                className="w-full bg-brown text-cream font-black py-4 rounded-xl hover:bg-pickle transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)] flex justify-center items-center gap-2"
              >
                Start Shopping <ArrowRight size={20} />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
