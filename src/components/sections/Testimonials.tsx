import { motion } from 'framer-motion';

const testimonials = [
  { id: 1, text: "The best mango pickle I've ever tasted. It instantly reminds me of my grandmother's recipe.", name: "Priya S." },
  { id: 2, text: "Perfect balance of spice and tanginess. I have this with almost every meal now!", name: "Rahul M." },
  { id: 3, text: "Premium packaging and authentic taste. Worth every penny.", name: "Anita K." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Loved by Thousands</h2>
          <p className="text-xl text-brown/70 font-medium">Don't just take our word for it.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#FFF2C6] p-8 rounded-[2rem] shadow-xl border border-cream md:w-1/3 flex flex-col justify-between"
            >
              <div className="text-mango text-4xl font-serif mb-4">"</div>
              <p className="text-lg text-brown/80 font-medium mb-8 italic">{t.text}</p>
              <div className="font-bold text-pickle">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
