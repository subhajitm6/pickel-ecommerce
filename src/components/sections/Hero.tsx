import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import mangoPickleImg from '../../assets/images/mango_pickel_1.png';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-mango/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-chili/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-tight"
          >
            Traditional Taste.<br/>
            <span className="text-pickle">Modern Experience.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-lg mx-auto md:mx-0 font-medium"
          >
            Fresh handcrafted pickles delivered straight to your doorstep.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a href="#products" className="bg-mango text-brown font-black text-lg px-8 py-4 rounded-full hover:bg-pickle hover:text-white hover:shadow-[0_0_20px_rgba(255,122,0,0.5)] transition-all transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center">
              Shop Collection <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#collections" className="bg-transparent border-2 border-brown text-brown font-black text-lg px-8 py-4 rounded-full hover:bg-brown hover:text-cream transition-all transform hover:-translate-y-1 w-full sm:w-auto text-center">
              Explore Flavors
            </a>
          </motion.div>
        </div>
        
        <div className="md:w-1/2 relative h-[600px] w-full flex items-center justify-center">
          {/* Parallax background for 3D jar */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 w-80 h-[28rem] bg-gradient-to-tr from-mango/30 to-pickle/50 rounded-[3rem] backdrop-blur-md border-[3px] border-white/40 shadow-2xl flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <img src={mangoPickleImg} alt="Mango Pickle" className="relative z-10 w-full h-full object-cover" />
          </motion.div>

          {/* Floating spices */}
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 z-30 text-chili/80 drop-shadow-lg"
          >
            <Leaf size={48} />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 40, 0], rotate: [0, -30, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-24 left-10 z-30 text-fresh/80 drop-shadow-lg"
          >
            <Leaf size={56} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm font-bold text-foreground/60 mb-2 tracking-widest uppercase">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-foreground/20 overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-pickle rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
