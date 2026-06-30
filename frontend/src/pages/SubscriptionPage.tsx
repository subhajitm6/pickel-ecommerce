import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SubscriptionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPlan = queryParams.get('plan') || 'Monthly Jar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    plan: initialPlan,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.post('https://pickel-ecommerce-laravel-api.onrender.com/api/subscribe', formData, { headers });
      
      if (response.status === 201) {
        navigate('/subscribe/success');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-mango/20">
          <h1 className="text-4xl font-black text-brown mb-2 text-center">Complete Your Subscription</h1>
          <p className="text-brown/70 text-center mb-8">Fill in your details to start receiving our delicious pickles.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-brown mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-mango/30 focus:outline-none focus:ring-2 focus:ring-mango focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brown mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-mango/30 focus:outline-none focus:ring-2 focus:ring-mango focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-brown mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-mango/30 focus:outline-none focus:ring-2 focus:ring-mango focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brown mb-2">Select Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-mango/30 focus:outline-none focus:ring-2 focus:ring-mango focus:border-transparent transition-all"
                >
                  <option value="Monthly Jar">Monthly Jar - ₹999/mo</option>
                  <option value="Spice Lover Box">Spice Lover Box - ₹1499/mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brown mb-2">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-mango/30 focus:outline-none focus:ring-2 focus:ring-mango focus:border-transparent transition-all resize-none"
                placeholder="Full delivery address..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-mango text-brown font-black py-4 rounded-xl hover:bg-[#FFF2C6] transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {loading ? 'Processing...' : 'Confirm Subscription'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
