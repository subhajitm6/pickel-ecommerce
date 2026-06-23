import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, MapPin, Heart, Bell, Settings, Edit2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: <Edit2 size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-32 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-brown rounded-[2rem] p-8 md:p-12 text-cream mb-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pickle/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="w-24 h-24 rounded-full bg-mango p-1 shrink-0 relative z-10">
            <img 
              src={user?.avatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email}`} 
              alt={user?.name}
              className="w-full h-full rounded-full object-cover bg-cream"
            />
          </div>
          <div className="text-center md:text-left relative z-10 flex-1">
            <h1 className="text-4xl font-black mb-2">{user?.name}</h1>
            <p className="text-cream/60 font-medium text-lg">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="relative z-10 bg-white/10 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 border border-white/10 hover:border-red-500"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-[2rem] p-4 shadow-xl border border-mango/10 sticky top-24">
              <nav className="flex flex-col space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.id === 'orders') {
                        navigate('/my-orders');
                      } else {
                        setActiveTab(tab.id);
                      }
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-pickle text-white shadow-md' : 'text-brown/70 hover:bg-mango/10 hover:text-brown'}`}
                  >
                    <div className="flex items-center gap-3">
                      {tab.icon}
                      {tab.label}
                    </div>
                    {activeTab === tab.id && <ChevronRight size={18} />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-mango/10 min-h-[500px]"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-3xl font-black text-brown mb-8">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brown/60">Full Name</label>
                        <input type="text" defaultValue={user?.name} className="w-full bg-cream border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brown/60">Email Address</label>
                        <input type="email" defaultValue={user?.email} disabled className="w-full bg-cream/50 border border-mango/10 rounded-xl px-4 py-3 font-medium text-brown/50 cursor-not-allowed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-brown/60">Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" className="w-full bg-cream border border-mango/20 rounded-xl px-4 py-3 focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown" />
                      </div>
                    </div>
                    <button className="mt-8 bg-brown text-cream font-black py-4 px-8 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-md">
                      Save Changes
                    </button>
                  </div>
                )}

                {/* Orders Tab Content Removed - Handled by /my-orders route */}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-3xl font-black text-brown mb-8">My Wishlist</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-cream rounded-3xl p-4 relative group">
                        <button className="absolute top-6 right-6 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md hover:scale-110 transition-transform">
                          <Heart size={16} fill="currentColor" />
                        </button>
                        <div className="h-40 rounded-2xl bg-gradient-to-br from-mango to-pickle mb-4" />
                        <h4 className="font-bold text-brown text-lg">Signature Mango</h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-black text-pickle">₹299</span>
                          <button className="text-sm font-bold bg-brown text-white px-4 py-2 rounded-lg hover:bg-mango hover:text-brown transition-colors">Add</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Placeholder for other tabs */}
                {['addresses', 'notifications', 'settings'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                    <Settings className="w-16 h-16 text-mango/40 mb-4 animate-spin-slow" />
                    <h3 className="text-2xl font-black text-brown/40 mb-2">Coming Soon</h3>
                    <p className="text-brown/40 font-medium">This section is currently under construction.</p>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
