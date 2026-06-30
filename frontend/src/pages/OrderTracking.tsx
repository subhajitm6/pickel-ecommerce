import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Check, Package, Truck, Home, MapPin, Phone } from 'lucide-react';

const timelineSteps = [
  { id: 1, title: 'Order Placed', time: 'Nov 20, 10:45 AM', status: 'completed', icon: Check },
  { id: 2, title: 'Processing', time: 'Nov 20, 02:30 PM', status: 'completed', icon: Package },
  { id: 3, title: 'Packed', time: 'Nov 21, 09:15 AM', status: 'completed', icon: Package },
  { id: 4, title: 'Shipped', time: 'Nov 21, 11:00 AM', status: 'current', icon: Truck },
  { id: 5, title: 'Out For Delivery', time: 'Pending', status: 'pending', icon: Truck },
  { id: 6, title: 'Delivered', time: 'Pending', status: 'pending', icon: Home },
];

export function OrderTracking() {
  const { id } = useParams<{ id: string }>();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 bg-background min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-mango/20 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-brown mb-2">Track Order</h1>
            <p className="text-xl text-brown/60 font-medium">Order #{id || 'SPICE-8492'}</p>
          </div>
          <div className="bg-pickle/10 px-6 py-3 rounded-full border border-pickle/20">
            <span className="text-brown/70 font-bold mr-2">Status:</span>
            <span className="text-pickle font-black uppercase tracking-wider">In Transit</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Timeline */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-mango/10">
              <h2 className="text-2xl font-black text-brown mb-10">Delivery Updates</h2>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-4 bottom-10 w-1 bg-cream rounded-full -z-10" />
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: '60%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute left-[27px] top-4 w-1 bg-pickle rounded-full -z-10" 
                />

                <div className="space-y-10">
                  {timelineSteps.map((step, i) => (
                    <motion.div 
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-6 relative"
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                        step.status === 'completed' ? 'bg-pickle text-white' : 
                        step.status === 'current' ? 'bg-white text-pickle border-4 border-pickle' : 
                        'bg-cream text-brown/40 border-2 border-cream'
                      }`}>
                        <step.icon size={24} />
                      </div>
                      <div className="pt-2">
                        <h3 className={`text-lg font-black ${step.status === 'pending' ? 'text-brown/40' : 'text-brown'}`}>
                          {step.title}
                        </h3>
                        <p className={`font-medium ${step.status === 'pending' ? 'text-brown/30' : 'text-brown/60'}`}>
                          {step.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info & Map Placeholder */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10 overflow-hidden relative h-64 flex items-center justify-center group cursor-pointer">
              {/* Fake Map Background */}
              <div className="absolute inset-0 bg-cream/50 opacity-50" style={{ backgroundImage: 'radial-gradient(#FFC533 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-pickle rounded-full text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,122,0,0.5)] group-hover:scale-110 transition-transform">
                  <MapPin size={32} />
                </div>
                <div className="font-black text-brown text-xl bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full inline-block">
                  Arriving Today by 8 PM
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10">
              <h3 className="text-xl font-black text-brown mb-6">Delivery Address</h3>
              <p className="text-brown/80 font-medium leading-relaxed mb-6">
                123 Spice Lane, Flavor City, FC 90210<br />
                United States
              </p>
              
              <div className="border-t border-mango/10 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center font-black text-brown text-xl">
                    J
                  </div>
                  <div>
                    <div className="font-bold text-brown">John Delivery</div>
                    <div className="text-sm font-medium text-brown/60">Courier Partner</div>
                  </div>
                </div>
                <button className="w-12 h-12 bg-fresh/10 text-fresh rounded-full flex items-center justify-center hover:bg-fresh hover:text-white transition-colors">
                  <Phone size={20} />
                </button>
              </div>
            </div>
            
            <Link to="/" className="w-full block text-center py-4 font-bold text-brown hover:text-pickle transition-colors">
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
