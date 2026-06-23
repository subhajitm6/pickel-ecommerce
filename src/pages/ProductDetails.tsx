import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../data';
import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product) setSelectedImage(product.image);
  }, [product]);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-2xl font-black text-brown">Product Not Found</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-20 bg-background min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-sm font-medium text-brown/60 mb-8 flex gap-2">
          <Link to="/" className="hover:text-pickle">Home</Link>
          <span>/</span>
          <Link to="/#products" className="hover:text-pickle">Products</Link>
          <span>/</span>
          <span className="text-brown">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          
          {/* Left: Images */}
          <div className="lg:w-1/2 flex gap-4">
            <div className="flex flex-col gap-4">
              {[product.image, ...product.thumbnails].filter(Boolean).map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-mango shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <motion.div 
              className={`flex-1 rounded-[2.5rem] bg-gradient-to-br ${product.color} relative overflow-hidden flex items-center justify-center shadow-xl border border-white/20 p-8`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-white/20" />
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10"
              />
            </motion.div>
          </div>

          {/* Right: Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            {product.tag && (
              <span className="inline-block bg-mango/20 text-pickle font-black px-4 py-1 rounded-full text-sm w-fit mb-4">
                {product.tag}
              </span>
            )}
            <h1 className="text-4xl lg:text-5xl font-black text-brown mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-mango">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={i < Math.floor(product.rating) ? "fill-current" : ""} size={20} />
                ))}
              </div>
              <span className="text-brown/70 font-bold">{product.rating} ({product.reviews} Reviews)</span>
            </div>

            <p className="text-xl text-brown/80 font-medium mb-8 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-black text-pickle">₹{product.price}</span>
            </div>
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-2xl font-bold text-brown/40 line-through mb-1">₹{product.originalPrice}</span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between bg-white border border-mango/20 rounded-full px-4 py-2 w-full sm:w-32 shadow-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-brown hover:text-pickle"><Minus size={20}/></button>
                <span className="font-bold text-xl">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-brown hover:text-pickle"><Plus size={20}/></button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-brown text-cream font-black text-lg py-4 rounded-full hover:bg-mango hover:text-brown transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                ADD TO CART
              </button>
              
              <button className="w-14 h-14 flex items-center justify-center bg-white border border-mango/20 rounded-full text-brown hover:text-chili hover:border-chili transition-colors shadow-sm">
                <Heart size={24} />
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm font-bold text-brown/70 mb-8 border-t border-b border-mango/10 py-4">
              <div className="flex items-center gap-2"><Truck className="text-fresh"/> {product.deliveryDays}</div>
              <div className="flex items-center gap-2"><ShieldCheck className="text-fresh"/> In Stock</div>
            </div>

            {/* Quick Features */}
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-brown/80">
                  <div className="w-2 h-2 rounded-full bg-pickle" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-xl border border-mango/10">
          <div className="flex gap-8 border-b border-mango/10 mb-8 overflow-x-auto hide-scrollbar pb-4">
            {['description', 'ingredients', 'nutrition', 'reviews'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xl font-black capitalize whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-pickle' : 'text-brown/40 hover:text-brown'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab" className="absolute -bottom-[17px] left-0 right-0 h-1 bg-pickle rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'description' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg text-brown/80 font-medium leading-relaxed max-w-4xl">
                {product.description}
              </motion.p>
            )}
            
            {activeTab === 'ingredients' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-4">
                {product.ingredients.map((ing, i) => (
                  <div key={i} className="bg-cream border border-mango/20 px-6 py-3 rounded-full text-brown font-bold shadow-sm">
                    {ing}
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md bg-cream rounded-2xl overflow-hidden border border-mango/20">
                {product.nutrition.map((item, i) => (
                  <div key={i} className={`flex justify-between p-4 ${i !== 0 ? 'border-t border-mango/10' : ''}`}>
                    <span className="font-bold text-brown/80">{item.label}</span>
                    <span className="font-black text-brown">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <div className="text-6xl font-black text-mango mb-4">{product.rating}</div>
                <div className="flex justify-center text-mango mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="fill-current" size={24} />)}
                </div>
                <p className="text-brown/70 font-bold">Based on {product.reviews} reviews</p>
                <button className="mt-6 border-2 border-brown text-brown font-black px-8 py-3 rounded-full hover:bg-brown hover:text-white transition-colors">
                  Write a Review
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
