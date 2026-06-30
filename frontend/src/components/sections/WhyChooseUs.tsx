import { motion } from 'framer-motion';
import { Heart, Leaf, ShieldCheck, Truck, Clock } from 'lucide-react';

const features = [
  { icon: <Heart size={32} />, title: 'Handmade', count: '100%' },
  { icon: <Leaf size={32} />, title: 'Fresh Ingredients', count: '50+' },
  { icon: <ShieldCheck size={32} />, title: 'No Preservatives', count: '0%' },
  { icon: <Truck size={32} />, title: 'Fast Delivery', count: '48h' },
  { icon: <Clock size={32} />, title: 'Authentic Taste', count: '1890' },
];

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#FFF2C6] rounded-[2rem] p-8 text-center shadow-lg border border-mango/20 hover:border-mango hover:shadow-mango/20 transition-all"
            >
              <div className="w-16 h-16 mx-auto bg-mango/20 text-pickle rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                className="text-4xl font-black text-brown mb-2"
              >
                {feature.count}
              </motion.div>
              <h3 className="text-lg font-bold text-brown/80">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
