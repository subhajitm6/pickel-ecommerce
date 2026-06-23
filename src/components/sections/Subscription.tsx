import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function Subscription() {
  return (
    <section className="py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Never Run Out Of Flavor</h2>
          <p className="text-xl text-brown/70 font-medium">Subscribe and save on your favorite pickles.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
          {/* Plan 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFF2C6] p-10 rounded-[2rem] shadow-lg border border-mango/20 w-full md:w-1/2 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-brown mb-2">Monthly Jar</h3>
            <div className="text-4xl font-black text-pickle mb-6">₹999<span className="text-lg text-brown/50 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 font-medium text-brown/80"><Check className="text-fresh w-5 h-5" /> 1 Flavor of your choice</li>
              <li className="flex items-center gap-3 font-medium text-brown/80"><Check className="text-fresh w-5 h-5" /> Free Shipping</li>
              <li className="flex items-center gap-3 font-medium text-brown/80"><Check className="text-fresh w-5 h-5" /> Cancel anytime</li>
            </ul>
            <button className="w-full bg-brown/10 text-brown font-bold py-4 rounded-full hover:bg-brown hover:text-white transition-colors">Subscribe Now</button>
          </motion.div>

          {/* Plan 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brown p-10 rounded-[2rem] shadow-2xl border border-mango relative w-full md:w-1/2 flex flex-col transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mango text-brown font-black px-4 py-1 rounded-full text-sm">Best Value</div>
            <h3 className="text-2xl font-bold text-cream mb-2">Spice Lover Box</h3>
            <div className="text-4xl font-black text-mango mb-6">₹1499<span className="text-lg text-cream/50 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3 font-medium text-cream/90"><Check className="text-lime w-5 h-5" /> 3 Unique flavors</li>
              <li className="flex items-center gap-3 font-medium text-cream/90"><Check className="text-lime w-5 h-5" /> Free Shipping</li>
              <li className="flex items-center gap-3 font-medium text-cream/90"><Check className="text-lime w-5 h-5" /> Exclusive early access</li>
              <li className="flex items-center gap-3 font-medium text-cream/90"><Check className="text-lime w-5 h-5" /> Cancel anytime</li>
            </ul>
            <button className="w-full bg-mango text-brown font-black py-4 rounded-full hover:bg-[#FFF2C6] transition-colors shadow-[0_0_15px_rgba(255,197,51,0.4)] hover:shadow-[0_0_20px_rgba(255,197,51,0.8)]">Subscribe Now</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
