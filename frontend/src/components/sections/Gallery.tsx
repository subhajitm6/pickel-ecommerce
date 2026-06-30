import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import img1 from '../../assets/images/gallery_1.png';
import img2 from '../../assets/images/gallery_2.png';
import img3 from '../../assets/images/gallery_3.png';
import img4 from '../../assets/images/gallery_4.png';
import img5 from '../../assets/images/gallery_5.png';
import img6 from '../../assets/images/gallery_6.png';

const allImages = [img1, img2, img3, img4, img5, img6];

const galleryItems = [
  {
    image: img1,
    title: 'Classic Mango Pickle',
    recipe: '1. Wash and cut raw mangoes into bite-sized chunks.\n2. Mix with turmeric and salt, then sun-dry for 2-3 days.\n3. Roast and grind mustard seeds, fenugreek, and fennel.\n4. Mix spices with cold-pressed mustard oil and red chili powder.\n5. Coat mango pieces thoroughly and store in a ceramic or glass jar.\n6. Let it mature in the sun for 2 weeks before serving.'
  },
  {
    image: img2,
    title: 'Spicy Garlic Pickle',
    recipe: '1. Peel fresh garlic cloves and pat them completely dry.\n2. Heat mustard oil until it smokes, then let it cool slightly.\n3. Sauté garlic cloves until they turn golden brown.\n4. Add mustard seeds, chili powder, turmeric, and a pinch of asafoetida (hing).\n5. Mix in a splash of vinegar for tanginess and preservation.\n6. Let it cool completely before jarring.'
  },
  {
    image: img3,
    title: 'Sweet Lemon Pickle',
    recipe: '1. Steam or boil whole lemons until the skin softens.\n2. Cut into quarters and carefully remove all seeds.\n3. Mix lemon pieces with sugar, salt, roasted cumin powder, and black pepper.\n4. Place in a clean glass jar and tie a muslin cloth over the mouth.\n5. Leave in the sun for 10-15 days, stirring occasionally until the sugar turns into a thick syrup.'
  },
  {
    image: img4,
    title: 'Mixed Vegetable Pickle',
    recipe: '1. Chop carrots, cauliflower, and green chilies into small pieces.\n2. Blanch the vegetables in boiling water for 2 minutes, then dry thoroughly on a towel.\n3. Heat oil and temper with kalonji (nigella seeds) and fennel seeds.\n4. Add vegetables, vinegar, salt, and pickling spices.\n5. Toss well and let it marinate. Ready to eat in 3-4 days.'
  },
  {
    image: img5,
    title: 'Stuffed Red Chili Pickle',
    recipe: '1. Wash large red chilies, dry them, and slit them down the middle. Remove seeds.\n2. Prepare a dry stuffing by blending mustard powder, fennel, fenugreek, salt, and amchur (dry mango powder).\n3. Mix the spice blend with a little mustard oil to bind it.\n4. Generously stuff each chili and pack them tightly into a jar.\n5. Pour warm mustard oil over them until submerged. Mature for a month.'
  },
  {
    image: img6,
    title: 'Tangy Gooseberry (Amla) Pickle',
    recipe: '1. Steam amlas (gooseberries) for 10 minutes until they soften and open into segments.\n2. Remove and discard the seeds.\n3. Heat sesame oil, add mustard seeds, dried red chilies, and a pinch of hing.\n4. Add red chili powder, turmeric, salt, and the amla segments.\n5. Toss gently until well coated. Store in an airtight container.'
  }
];

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleRecipeClick = (item: typeof galleryItems[0]) => {
    setSelectedItem(item);
    setCurrentStep(0);
  };

  const closeModal = () => setSelectedItem(null);

  const steps = selectedItem ? selectedItem.recipe.split('\n').filter(s => s.trim()) : [];

  const nextStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };

  const prevStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  return (
    <section className="py-32 bg-[#FFF2C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Our Pickle Gallery</h2>
          <p className="text-xl text-brown/70 font-medium">A visual feast of our handcrafted delights. Click to view recipes!</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleRecipeClick(item)}
              className={`relative overflow-hidden rounded-[2rem] bg-background/50 shadow-md group cursor-pointer ${i % 3 === 0 ? 'h-96' : i % 2 === 0 ? 'h-64' : 'h-80'}`}
            >
              {/* Image */}
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-black text-xl tracking-wide">{item.title}</span>
                  <div className="text-mango font-bold text-sm text-center mt-2">View Recipe</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-brown shadow-lg transition-colors border border-pickle/10"
              >
                <X size={24} />
              </button>

              {/* Image side (Carousel) */}
              <div className="md:w-1/2 relative h-72 md:h-auto overflow-hidden bg-background">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentStep}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    src={allImages[(galleryItems.indexOf(selectedItem) + currentStep) % allImages.length]}
                    alt={`Step ${currentStep + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Decorative overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 text-white font-black text-2xl z-10 drop-shadow-md">
                  Step {currentStep + 1}
                </div>
              </div>

              {/* Content side */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-[#FFF2C6] overflow-y-auto">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-brown mb-4 leading-tight">{selectedItem.title}</h3>
                  <div className="inline-block bg-mango/20 text-brown border border-mango font-bold px-4 py-2 rounded-full mb-8 text-sm uppercase tracking-wider">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  
                  <div className="relative min-h-[150px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl md:text-2xl font-medium text-brown/80 leading-relaxed absolute top-0 left-0 right-0"
                      >
                        {steps[currentStep].replace(/^\d+\.\s*/, '')} {/* Remove numbering for cleaner look */}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex flex-col mt-16 pt-8 border-t-2 border-brown/10">
                  <div className="flex gap-2 justify-center mb-8">
                    {steps.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setCurrentStep(i)}
                        className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-8 bg-pickle' : 'w-2 bg-brown/20 hover:bg-brown/40'}`} 
                        aria-label={`Go to step ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${
                        currentStep === 0 ? 'opacity-30 cursor-not-allowed bg-brown/5 text-brown' : 'bg-white hover:bg-mango hover:text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] text-brown'
                      }`}
                    >
                      <ChevronLeft size={20} /> Prev
                    </button>
                    
                    <button
                      onClick={nextStep}
                      disabled={currentStep === steps.length - 1}
                      className={`px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${
                        currentStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed bg-brown/5 text-brown' : 'bg-pickle hover:bg-[#4a2e16] shadow-[0_4px_14px_0_rgba(92,58,33,0.3)] text-white'
                      }`}
                    >
                      {currentStep === steps.length - 1 ? 'Done' : 'Next'} <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
