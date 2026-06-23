import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setAuthError('');
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setAuthError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream flex flex-col md:flex-row overflow-hidden"
    >
      {/* Left side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-brown relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1627464063853-93d395a12d1b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brown via-brown/80 to-mango/40" />
        
        <div className="relative z-10 max-w-lg text-cream">
          <Link to="/" className="inline-flex items-center text-mango hover:text-white transition-colors mb-12 font-bold gap-2">
            <ArrowLeft size={20} /> Back to Store
          </Link>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black mb-6 leading-tight"
          >
            Welcome Back to Spice&Co.
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-cream/70 font-medium"
          >
            Continue your flavor journey with our handcrafted, sun-dried traditional pickles.
          </motion.p>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-mango/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-pickle/20 rounded-full blur-3xl"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        <Link to="/" className="md:hidden absolute top-8 left-8 inline-flex items-center text-brown/60 hover:text-brown transition-colors font-bold gap-2">
          <ArrowLeft size={20} /> Back
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10 mt-12 md:mt-0">
            <h2 className="text-4xl font-black text-brown mb-2">Sign In</h2>
            <p className="text-brown/60 font-medium">Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {authError && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100">
                {authError}
              </div>
            )}

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
                  className="w-full bg-white border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm font-medium mt-1">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center block">
                <label className="text-sm font-bold text-brown">Password</label>
                <Link to="/forgot-password" className="text-sm font-bold text-pickle hover:text-mango transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className="w-full bg-white border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm font-medium mt-1">{errors.password.message as string}</p>}
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                {...register("remember")}
                className="w-4 h-4 text-pickle bg-white border-mango/20 rounded focus:ring-pickle"
              />
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-brown/80 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brown text-cream font-black py-4 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)] hover:shadow-[0_5px_20px_rgba(255,197,51,0.4)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-mango/10">
            <p className="text-center font-medium text-brown/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-pickle font-bold hover:text-mango transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
