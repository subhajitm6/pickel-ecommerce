import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Select Ingredients', desc: 'Handpicking the freshest produce and sun-dried spices.' },
  { id: 2, title: 'Traditional Preparation', desc: 'Cutting, marinating, and mixing by hand in small batches.' },
  { id: 3, title: 'Natural Preservation', desc: 'Sun-curing in traditional ceramic jars for authentic taste.' },
  { id: 4, title: 'Packaging', desc: 'Carefully sealed in glass jars to maintain freshness.' },
  { id: 5, title: 'Delivery', desc: 'Delivered straight to your doorstep.' },
];

export function HowWeMakeIt() {
  return (
    <section id="process" className="py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">How We Make It</h2>
          <p className="text-xl text-brown/70 font-medium">The journey of flavor.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-brown/10 rounded-full" />
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-1/2" />
                
                {/* Node */}
                <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 w-8 h-8 bg-mango border-4 border-cream rounded-full z-10 shadow-lg" />
                
                {/* Content */}
                <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="bg-[#FFF2C6] p-6 rounded-3xl shadow-lg border border-mango/20 hover:border-mango transition-colors">
                    <span className="text-pickle font-black text-xl mb-2 block">Step {step.id}</span>
                    <h3 className="text-2xl font-bold text-brown mb-3">{step.title}</h3>
                    <p className="text-brown/70 font-medium">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
