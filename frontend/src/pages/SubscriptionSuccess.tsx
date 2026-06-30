import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function SubscriptionSuccess() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle2 className="w-24 h-24 text-fresh mx-auto mb-6" />
          <h1 className="text-4xl font-black text-brown mb-4">You're Subscribed!</h1>
          <p className="text-brown/70 text-lg mb-8">
            Thank you for subscribing. Get ready to experience the best pickles delivered straight to your door.
            We will contact you shortly regarding your first delivery.
          </p>
          <Link
            to="/"
            className="inline-block bg-mango text-brown font-black px-8 py-4 rounded-full hover:bg-[#FFF2C6] transition-colors shadow-lg hover:shadow-xl"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
