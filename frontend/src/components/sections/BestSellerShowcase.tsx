import { motion } from 'framer-motion';
import mangoPickleImg from '../../assets/images/mango_pickel_1.png';

export function BestSellerShowcase() {
  return (
    <section className="py-32 bg-[#FFF2C6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-mango/20 to-pickle/10 rounded-[3rem] p-12 md:p-20 relative border border-mango/20 shadow-xl flex flex-col md:flex-row items-center">
          
          <div className="md:w-1/2 relative z-10 mb-12 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 1.5 }}
              className="w-64 h-80 md:w-80 md:h-96 bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white mx-auto flex items-center justify-center"
            >
              <img src={mangoPickleImg} alt="Bestseller Pickle" className="w-full h-full object-cover rounded-[2rem]" />
            </motion.div>
          </div>

          <div className="md:w-1/2 md:pl-12 text-center md:text-left relative z-10">
            <div className="inline-block bg-pickle text-white font-bold px-4 py-1 rounded-full mb-6 text-sm">
              #1 Bestseller
            </div>
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-brown mb-6"
            >
              Signature <span className="text-pickle">Mango</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-brown/80 mb-8 font-medium leading-relaxed"
            >
              The perfect balance of tangy raw mangoes, roasted fenugreek, and mustard oil. A recipe passed down through four generations.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <button className="bg-brown text-cream text-xl font-black px-10 py-5 rounded-full hover:bg-pickle transition-colors shadow-[0_10px_20px_rgba(74,44,22,0.2)] hover:shadow-[0_10px_20px_rgba(255,122,0,0.3)] transform hover:-translate-y-1">
                Add to Cart - ₹999
              </button>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
