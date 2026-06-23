import { motion } from 'framer-motion';
import mangoImg from '../../assets/images/category_mango.png';
import garlicImg from '../../assets/images/category_garlic.png';
import lemonImg from '../../assets/images/category_lemon.png';
import mixedImg from '../../assets/images/category_mixed.png';
import chiliImg from '../../assets/images/category_chili.png';

const categories = [
  { name: 'Mango', color: 'bg-mango', img: mangoImg },
  { name: 'Garlic', color: 'bg-brown/80', img: garlicImg },
  { name: 'Lemon', color: 'bg-lime', img: lemonImg },
  { name: 'Mixed', color: 'bg-chili', img: mixedImg },
  { name: 'Chili', color: 'bg-pickle', img: chiliImg },
];

export function CategoryShowcase() {
  return (
    <section id="collections" className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Our Collections</h2>
          <p className="text-xl text-brown/70 font-medium">Explore by your favorite ingredient.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`${category.color} aspect-[4/5] rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 group`}
            >
              <img src={category.img} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <h3 className="text-3xl font-black text-white relative z-10 drop-shadow-md">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
