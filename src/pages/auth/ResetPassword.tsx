import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';

export function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSuccess(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-mango/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-pickle/5 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link to="/login" className="inline-flex items-center text-brown/60 hover:text-brown transition-colors mb-8 font-bold gap-2">
          <ArrowLeft size={20} /> Back to Login
        </Link>

        {isSuccess ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-mango/20 text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-20 h-20 bg-fresh/10 text-fresh rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h2 className="text-3xl font-black text-brown mb-4">Password Updated</h2>
            <p className="text-brown/60 font-medium mb-8">
              Your password has been successfully reset. Redirecting you to login...
            </p>
            <Loader2 className="w-8 h-8 text-pickle animate-spin mx-auto" />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-mango/10"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-black text-brown mb-2">Create New Password</h2>
              <p className="text-brown/60 font-medium">Please enter a strong new password.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brown block">New Password</label>
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
                    className="w-full bg-cream border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                    placeholder="Create new password"
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

              <div className="space-y-2">
                <label className="text-sm font-bold text-brown block">Confirm New Password</label>
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
                    className="w-full bg-cream border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-2 focus:ring-mango/20 font-medium text-brown transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm font-medium mt-1">{errors.confirmPassword.message as string}</p>}
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-brown text-cream font-black py-4 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)] flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
