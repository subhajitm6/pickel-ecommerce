import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2, Loader2 } from 'lucide-react';

export function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (_data: any) => {
    setIsLoading(true);
    // Mock API call to send reset email
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream flex flex-col md:flex-row overflow-hidden"
    >
      <div className="hidden md:flex md:w-1/2 bg-mango relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596647900762-b94f092e022b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-mango via-mango/90 to-pickle/40" />
        
        <div className="relative z-10 max-w-lg text-brown">
          <Link to="/login" className="inline-flex items-center text-brown hover:text-white transition-colors mb-12 font-bold gap-2">
            <ArrowLeft size={20} /> Back to Login
          </Link>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black mb-6 leading-tight"
          >
            Forgot Your Password?
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-brown/70 font-medium space-y-4"
          >
            Don't worry, it happens to the best of us. We'll help you get back to ordering your favorite pickles in no time.
          </motion.p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        <Link to="/login" className="md:hidden absolute top-8 left-8 inline-flex items-center text-brown/60 hover:text-brown transition-colors font-bold gap-2">
          <ArrowLeft size={20} /> Back
        </Link>

        <div className="w-full max-w-md">
          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-mango/20 text-center"
            >
              <div className="w-20 h-20 bg-fresh/10 text-fresh rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black text-brown mb-4">Check Your Email</h2>
              <p className="text-brown/60 font-medium mb-8">
                We've sent password reset instructions to your email address. Please check your spam folder if you don't see it.
              </p>
              <Link 
                to="/login"
                className="w-full block bg-brown text-cream font-black py-4 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)]"
              >
                Return to Login
              </Link>
            </motion.div>
          ) : (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <div className="mb-10 mt-12 md:mt-0">
                <h2 className="text-4xl font-black text-brown mb-2">Reset Password</h2>
                <p className="text-brown/60 font-medium">Enter your email to receive reset instructions.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brown block">Email Address</label>
                  <div className="relative">
                    <input 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      })}
                      className="w-full bg-white border border-mango/20 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                      placeholder="you@example.com"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" size={20} />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm font-medium mt-1">{errors.email.message as string}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brown text-cream font-black py-4 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending Instructions...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
