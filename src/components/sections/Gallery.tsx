import { motion } from 'framer-motion';
import img1 from '../../assets/images/gallery_1.png';
import img2 from '../../assets/images/gallery_2.png';
import img3 from '../../assets/images/gallery_3.png';
import img4 from '../../assets/images/gallery_4.png';
import img5 from '../../assets/images/gallery_5.png';
import img6 from '../../assets/images/gallery_6.png';

const galleryImages = [img1, img2, img3, img4, img5, img6];

export function Gallery() {
  return (
    <section className="py-32 bg-[#FFF2C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Our Pickle Gallery</h2>
          <p className="text-xl text-brown/70 font-medium">A visual feast of our handcrafted delights.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((imgSrc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-[2rem] bg-background/50 shadow-md group cursor-pointer ${i % 3 === 0 ? 'h-96' : i % 2 === 0 ? 'h-64' : 'h-80'}`}
            >
              {/* Image */}
              <img src={imgSrc} alt={`Gallery Pickle ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">View Recipe</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
