import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "Are there any preservatives?", a: "No, our pickles are 100% natural. We use oil and salt as natural preservatives, following traditional methods." },
  { q: "How long do the pickles last?", a: "Unopened jars can last up to 12 months. Once opened, keep refrigerated and consume within 3 months." },
  { q: "Do you ship internationally?", a: "Currently, we ship nationwide within the US. We are working on international shipping options." },
  { q: "Are they very spicy?", a: "We have different spice levels. Our 'Sweet & Sour' collection is mild, while the 'Spicy Collection' packs a punch." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-[#FFF2C6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Got Questions?</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-cream rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 bg-background hover:bg-cream transition-colors text-left"
              >
                <span className="text-xl font-bold text-brown">{faq.q}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-pickle transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 bg-background text-brown/80 font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
