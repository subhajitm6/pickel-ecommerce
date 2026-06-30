import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF2C6] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-mango/10">
          
          {/* Contact Info */}
          <div className="bg-brown p-12 md:w-2/5 text-cream relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-mango/10 rounded-full blur-3xl" />
            
            <h2 className="text-4xl font-black text-mango mb-8 relative z-10">Get in Touch</h2>
            <p className="text-cream/80 mb-12 font-medium relative z-10">
              Have a question about our flavors or want to place a bulk order? We'd love to hear from you.
            </p>
            
            <div className="space-y-8 relative z-10 font-medium">
              <div className="flex items-center space-x-4">
                <div className="bg-mango/20 p-3 rounded-full text-mango"><Phone size={24} /></div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-mango/20 p-3 rounded-full text-mango"><Mail size={24} /></div>
                <span>hello@spiceandco.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-mango/20 p-3 rounded-full text-mango"><MapPin size={24} /></div>
                <span>123 Spice Lane, Flavor City, CA 90210</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-12 md:w-3/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-brown mb-2">First Name</label>
                  <input type="text" className="w-full bg-background border border-cream rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango transition-all text-brown" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brown mb-2">Last Name</label>
                  <input type="text" className="w-full bg-background border border-cream rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango transition-all text-brown" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brown mb-2">Email</label>
                <input type="email" className="w-full bg-background border border-cream rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango transition-all text-brown" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brown mb-2">Message</label>
                <textarea rows={4} className="w-full bg-background border border-cream rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango transition-all text-brown resize-none" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="submit" className="bg-mango text-brown font-black px-8 py-4 rounded-xl hover:bg-pickle hover:text-white transition-all w-full flex justify-center items-center gap-2 group shadow-lg hover:shadow-xl">
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
