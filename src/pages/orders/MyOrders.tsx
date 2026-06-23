import { motion, AnimatePresence } from 'framer-motion';
import { useOrders, type Order } from '../../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Clock, MapPin, Calendar, Search, Download, RefreshCw, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data';

export function MyOrders() {
  const { orders } = useOrders();
  const { addToCart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  
  // Track expanded orders (by order ID)
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const statuses = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const toggleExpand = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Placed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-mango/20 text-brown border-mango/40';
      case 'Packed': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Shipped': return 'bg-lime text-brown border-lime/50';
      case 'Delivered': return 'bg-fresh/20 text-fresh border-fresh/40';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBuyAgain = (item: any) => {
    const fullProduct = products.find(p => p.id === item.id);
    if (fullProduct) {
      addToCart(fullProduct, item.quantity);
    } else {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        color: item.color,
        image: item.image || '',
        slug: item.id.toLowerCase(),
        shortDescription: '',
        description: '',
        rating: 5,
        reviews: 1,
        inStock: true,
        deliveryDays: '2-3 Days',
        thumbnails: [],
        features: [],
        ingredients: [],
        nutrition: []
      }, item.quantity);
    }
    setIsCartOpen(true);
  };

  const filteredAndSortedOrders = useMemo(() => {
    return orders
      .filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All Orders' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [orders, filterStatus, searchQuery, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-32 pb-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-brown mb-4">My Orders</h1>
          <p className="text-xl text-brown/60 font-medium">Track and manage your recent purchases.</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-mango/10 mb-8 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" size={20} />
              <input 
                type="text" 
                placeholder="Search Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-cream border border-mango/20 rounded-xl focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-medium text-brown"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all border ${
                    filterStatus === status 
                      ? 'bg-pickle text-white border-pickle shadow-md' 
                      : 'bg-cream text-brown/60 border-mango/20 hover:border-mango hover:text-brown'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="w-full md:w-auto px-6 py-3 bg-cream border border-mango/20 rounded-xl focus:outline-none focus:border-mango focus:ring-1 focus:ring-mango font-bold text-brown appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {filteredAndSortedOrders.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2rem] p-12 text-center shadow-xl border border-mango/10 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="w-24 h-24 bg-mango/20 rounded-full flex items-center justify-center text-mango mb-6">
              <Package size={40} />
            </div>
            <h2 className="text-3xl font-black text-brown mb-4">No Orders Found</h2>
            <p className="text-brown/60 font-medium mb-8 max-w-md mx-auto">
              {searchQuery || filterStatus !== 'All Orders' 
                ? "We couldn't find any orders matching your filters." 
                : "You haven't placed any orders yet. Discover our collection of authentic handcrafted pickles."}
            </p>
            <Link 
              to="/"
              className="bg-brown text-cream font-black py-4 px-8 rounded-xl hover:bg-pickle transition-all shadow-[0_5px_15px_rgba(74,44,22,0.2)]"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {filteredAndSortedOrders.map((order, index) => {
                const isExpanded = expandedOrders[order.id];
                const displayedItems = isExpanded ? order.items : order.items.slice(0, 2);
                const hasMoreItems = order.items.length > 2;

                return (
                  <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-[2rem] shadow-xl border border-mango/10 hover:shadow-2xl transition-all overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-6 sm:p-8 bg-mango/5 border-b border-mango/10">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-4 mb-2">
                            <h3 className="text-2xl font-black text-brown">{order.id}</h3>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 text-brown/60 font-medium">
                            <div className="flex items-center gap-2">
                              <Calendar size={18} className="text-mango" />
                              {formatDate(order.date)}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={18} className="text-pickle" />
                              {order.shippingAddress.city}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start lg:items-end">
                          <div className="text-sm font-bold text-brown/60">Order Total</div>
                          <div className="text-3xl font-black text-brown mb-4">₹{order.total.toFixed(2)}</div>
                          
                          <div className="flex gap-3 w-full lg:w-auto">
                            <Link 
                              to={`/track/${order.id}`}
                              className="flex-1 bg-brown text-cream font-bold py-2 px-4 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-md text-center flex items-center justify-center gap-2 text-sm"
                            >
                              <Clock size={16} /> Track Order
                            </Link>
                            <button className="flex-1 bg-white text-brown border border-mango/20 font-bold py-2 px-4 rounded-xl hover:bg-mango/10 transition-all text-center flex items-center justify-center gap-2 text-sm">
                              <Download size={16} /> Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 sm:p-8 space-y-6">
                      {displayedItems.map((item, idx) => {
                        const fullProduct = products.find(p => p.id === item.id);
                        
                        return (
                          <div key={idx} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-4 rounded-2xl border border-mango/10 hover:border-mango/30 transition-colors bg-white">
                            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${item.color} shrink-0 shadow-inner cursor-pointer`} onClick={() => fullProduct && navigate(`/products/${fullProduct.slug}`)}>
                               {/* Image would go here if available */}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 
                                  className="text-xl font-bold text-brown cursor-pointer hover:text-pickle transition-colors"
                                  onClick={() => fullProduct && navigate(`/products/${fullProduct.slug}`)}
                                >
                                  {item.name}
                                </h4>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                                  <Star size={12} fill="currentColor" /> {fullProduct?.rating || 5.0}
                                </div>
                                <span className="text-sm font-bold text-brown/50">{fullProduct?.tag || 'Classic'}</span>
                              </div>

                              <div className="text-brown/60 font-medium">Qty: {item.quantity}</div>
                            </div>
                            
                            <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                              <div className="text-left sm:text-right">
                                <div className="text-xl font-black text-pickle">₹{(item.price * item.quantity).toFixed(2)}</div>
                                <div className="text-sm font-bold text-brown/40">₹{item.price.toFixed(2)} each</div>
                              </div>
                              
                              <div className="flex gap-2 w-full sm:w-auto">
                                <button 
                                  onClick={() => fullProduct && navigate(`/products/${fullProduct.slug}`)}
                                  className="flex-1 sm:flex-none bg-cream text-brown border border-mango/20 font-bold py-2 px-4 rounded-xl hover:bg-mango/10 transition-all text-center text-sm"
                                >
                                  View Product
                                </button>
                                <button 
                                  onClick={() => handleBuyAgain(item)}
                                  className="flex-1 sm:flex-none bg-pickle text-white font-bold py-2 px-4 rounded-xl hover:bg-pickle/90 transition-all shadow-md text-center flex items-center justify-center gap-2 text-sm"
                                >
                                  <RefreshCw size={14} /> Buy Again
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {hasMoreItems && (
                        <button 
                          onClick={() => toggleExpand(order.id)}
                          className="w-full py-3 bg-mango/5 text-brown font-bold rounded-xl border border-mango/20 hover:bg-mango/10 transition-colors flex items-center justify-center gap-2"
                        >
                          {isExpanded ? (
                            <>View Less <ChevronUp size={18} /></>
                          ) : (
                            <>View {order.items.length - 2} More Items <ChevronDown size={18} /></>
                          )}
                        </button>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
