import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { ArrowLeft, Package, MapPin, CreditCard, Download, Clock, CheckCircle2 } from 'lucide-react';

export function OrderDetails() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();

  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return <Navigate to="/my-orders" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusSteps = ['Placed', 'Processing', 'Packed', 'Shipped', 'Delivered'];
  const currentStepIndex = statusSteps.findIndex(s => s.toLowerCase() === order.order_status);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream pt-32 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <Link to="/my-orders" className="inline-flex items-center text-brown/60 hover:text-brown transition-colors mb-4 font-bold gap-2">
              <ArrowLeft size={20} /> Back to Orders
            </Link>
            <h1 className="text-4xl font-black text-brown">Order {order.id}</h1>
            <p className="text-brown/60 font-medium mt-1">Placed on {formatDate(order.created_at)}</p>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-white text-brown font-bold px-6 py-3 rounded-xl border border-mango/20 hover:border-mango shadow-sm flex items-center gap-2 transition-all">
              <Download size={18} /> Invoice
            </button>
            <Link 
              to={`/track/${order.id}`}
              className="bg-brown text-cream font-bold px-6 py-3 rounded-xl hover:bg-mango hover:text-brown transition-all shadow-lg flex items-center gap-2"
            >
              <Clock size={18} /> Track
            </Link>
          </div>
        </div>

        {/* Status Timeline Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pickle/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <h2 className="text-2xl font-black text-brown mb-8 relative z-10">Order Status</h2>
          
          <div className="relative z-10 flex justify-between items-center mt-12 mb-4 px-2 sm:px-10">
            {/* Connecting Line Background */}
            <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-mango/20 -z-10" />
            
            {/* Connecting Line Active */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(0, (currentStepIndex / (statusSteps.length - 1)) * 80)}%` }}
              className="absolute left-[10%] top-1/2 -translate-y-1/2 h-1 bg-pickle -z-10 transition-all duration-1000"
            />

            {statusSteps.map((step, idx) => {
              const isCompleted = currentStepIndex >= idx;
              const isCurrent = currentStepIndex === idx;
              
              return (
                <div key={step} className="flex flex-col items-center relative group">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
                      ${isCompleted ? 'bg-pickle text-white shadow-[0_0_15px_rgba(102,123,44,0.4)]' : 'bg-white border-2 border-mango/20 text-brown/40'}
                      ${isCurrent ? 'ring-4 ring-pickle/20' : ''}
                    `}
                  >
                    {isCompleted ? <CheckCircle2 size={isCurrent ? 24 : 20} /> : <div className="w-2.5 h-2.5 rounded-full bg-current opacity-30" />}
                  </motion.div>
                  <div className={`absolute top-full mt-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors duration-500 ${isCompleted ? 'text-brown' : 'text-brown/40'}`}>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Items & Summary) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Order Items */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10">
              <h2 className="text-2xl font-black text-brown mb-6 flex items-center gap-2">
                <Package className="text-pickle" /> Items Purchased
              </h2>
              
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${'from-mango to-yellow-400'} shrink-0 shadow-inner overflow-hidden flex items-center justify-center`}>
                      {item.product?.image && <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brown mb-1">{item.product?.title || 'Product Name'}</h3>
                      <div className="text-brown/60 font-medium">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-pickle">₹{(Number(item.price) * item.quantity).toFixed(2)}</div>
                      <div className="text-sm font-bold text-brown/40">₹{Number(item.price).toFixed(2)} each</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10">
              <h2 className="text-2xl font-black text-brown mb-6">Payment Summary</h2>
              
              <div className="space-y-4 font-medium text-brown/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brown font-bold">₹{Number(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-brown font-bold">{Number(order.shipping) === 0 ? 'Free' : `₹${Number(order.shipping).toFixed(2)}`}</span>
                </div>
                <div className="border-t border-mango/20 pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-brown">Total Amount</span>
                  <span className="text-3xl font-black text-pickle">₹{Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar (Delivery & Payment Info) */}
          <div className="space-y-8">
            
            {/* Delivery Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10">
              <h2 className="text-xl font-black text-brown mb-6 flex items-center gap-2">
                <MapPin className="text-mango" /> Delivery Address
              </h2>
              
              <div className="text-brown font-medium space-y-1">
                <p className="font-bold text-lg">{order.shipping_address?.full_name}</p>
                <p className="text-brown/70">{order.shipping_address?.address}</p>
                <p className="text-brown/70">{order.shipping_address?.city}, {order.shipping_address?.postal_code}</p>
                <p className="text-brown/70 mt-2">Phone: {order.shipping_address?.phone}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-mango/10">
              <h2 className="text-xl font-black text-brown mb-6 flex items-center gap-2">
                <CreditCard className="text-mango" /> Payment Details
              </h2>
              
              <div className="text-brown font-medium space-y-3">
                <div>
                  <div className="text-sm text-brown/60 mb-1">Method</div>
                  <div className="font-bold flex items-center gap-2">
                    <div className="w-8 h-5 bg-mango/20 rounded border border-mango/40 flex items-center justify-center text-[10px]">PAY</div>
                    {order.payment_method}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-brown/60 mb-1">Status</div>
                  <div className="font-bold text-fresh flex items-center gap-1">
                    <CheckCircle2 size={16} /> Paid successfully
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}
