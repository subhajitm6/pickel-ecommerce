import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Loader2, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

export function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const password = watch("password", "");

  // Simple password strength calculator
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 5
  };

  const strengthScore = calculateStrength(password);
  const getStrengthColor = () => {
    if (strengthScore <= 1) return 'bg-red-400';
    if (strengthScore <= 3) return 'bg-mango';
    return 'bg-pickle';
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setAuthError('');
    try {
      await registerUser(data.name, data.email, data.password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setAuthError(err.message || 'Failed to create account');
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
      <div className="hidden md:flex md:w-1/2 bg-pickle relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596647900762-b94f092e022b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-tr from-pickle via-pickle/90 to-lime/40" />
        
        <div className="relative z-10 max-w-lg text-cream">
          <Link to="/" className="inline-flex items-center text-lime hover:text-white transition-colors mb-12 font-bold gap-2">
            <ArrowLeft size={20} /> Back to Store
          </Link>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black mb-6 leading-tight"
          >
            Join the Flavor Family
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-cream/80 font-medium space-y-4"
          >
            Create an account to track your orders, save your favorite pickles to your wishlist, and get exclusive early access to new seasonal flavors.
          </motion.p>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-lime/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-mango/10 rounded-full blur-3xl"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative overflow-y-auto">
        <Link to="/" className="md:hidden absolute top-8 left-8 inline-flex items-center text-brown/60 hover:text-brown transition-colors font-bold gap-2">
          <ArrowLeft size={20} /> Back
        </Link>

        <div className="w-full max-w-md my-auto">
          <div className="mb-8 mt-12 md:mt-0">
            <h2 className="text-4xl font-black text-brown mb-2">Create Account</h2>
            <p className="text-brown/60 font-medium">Join us and discover handcrafted flavors.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {authError && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-start gap-2">
                <XCircle size={20} className="shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-brown block">Full Name</label>
              <div className="relative">
                <input 
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-white border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm font-medium mt-1">{errors.name.message as string}</p>}
            </div>

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
              <label className="text-sm font-bold text-brown block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="w-full bg-white border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                  placeholder="Create a password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="mt-2 flex gap-1 h-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-full transition-colors duration-300 ${i < strengthScore ? getStrengthColor() : 'bg-mango/10'}`} 
                    />
                  ))}
                </div>
              )}
              {errors.password && <p className="text-red-500 text-sm font-medium mt-1">{errors.password.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brown block">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: val => {
                      if (watch('password') != val) {
                        return "Your passwords do no match";
                      }
                    }
                  })}
                  className="w-full bg-white border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm font-medium mt-1">{errors.confirmPassword.message as string}</p>}
            </div>

            <div className="flex items-start mt-4">
              <input 
                type="checkbox" 
                id="terms" 
                {...register("terms", { required: "You must accept the terms" })}
                className="mt-1 w-4 h-4 text-pickle bg-white border-mango/20 rounded focus:ring-pickle"
              />
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-brown/80 cursor-pointer">
                I accept the <a href="#" className="text-pickle hover:text-mango font-bold transition-colors">Terms of Service</a> and <a href="#" className="text-pickle hover:text-mango font-bold transition-colors">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm font-medium mt-1">{errors.terms.message as string}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-brown text-cream font-black py-4 rounded-xl hover:bg-pickle transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)] hover:shadow-[0_5px_20px_rgba(102,123,44,0.4)] flex justify-center items-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <CheckCircle2 size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-mango/10">
            <p className="text-center font-medium text-brown/60">
              Already have an account?{' '}
              <Link to="/login" className="text-pickle font-bold hover:text-mango transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
