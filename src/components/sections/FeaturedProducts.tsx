import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data';
import { useCart } from '../../context/CartContext';

export function FeaturedProducts() {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= products.length ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? Math.max(0, products.length - itemsPerPage) : prev - 1));
  };

  return (
    <section id="products" className="py-32 bg-[#FFF2C6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black text-brown mb-6"
          >
            Featured Flavors
          </motion.h2>
          <p className="text-xl text-brown/70 font-medium">Taste the tradition in every bite.</p>
        </div>

        <div className="relative">
          <button 
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 lg:-left-6 z-10 p-4 rounded-full bg-white text-brown shadow-xl hover:bg-mango hover:text-white transition-all border border-pickle/10 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 lg:-right-6 z-10 p-4 rounded-full bg-white text-brown shadow-xl hover:bg-mango hover:text-white transition-all border border-pickle/10 group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12 min-h-[500px]">
            <AnimatePresence mode="popLayout">
            {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
                <Link to={`/products/${product.slug}`} className="block group h-full">
                  <motion.div 
                    whileHover={{ y: -10, rotate: 1 }}
                    className="bg-background rounded-[2.5rem] p-6 shadow-xl hover:shadow-[0_20px_40px_rgba(255,122,0,0.15)] transition-all duration-300 border border-pickle/10 relative h-full flex flex-col justify-between"
                  >
                {product.tag && (
                  <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-black text-brown shadow-sm">
                    {product.tag}
                  </div>
                )}
                
                <div className={`h-72 rounded-3xl mb-8 flex items-center justify-center bg-gradient-to-br ${product.color} opacity-80 group-hover:opacity-100 transition-opacity relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                  <motion.img src={product.image} alt={product.name} className="w-40 h-48 object-cover rounded-2xl shadow-lg border border-white/50 group-hover:rotate-6 transition-transform duration-500" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-brown mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-bold text-pickle">₹{product.price}</span>
                    <button 
                      onClick={(e) => handleAdd(e, product)}
                      className="bg-brown text-cream px-6 py-3 rounded-full font-bold hover:bg-mango hover:text-brown transition-colors shadow-md relative z-20"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
            </motion.div>
          ))}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
