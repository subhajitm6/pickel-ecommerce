import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: any;
}

export interface Order {
  id: string;
  order_number: string;
  created_at: string;
  order_status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: string;
  shipping_address?: any;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: any) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }
    try {
      const response = await api.get('/my-orders');
      setOrders(response.data);
    } catch (e) {
      console.error('Failed to fetch orders', e);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  const addOrder = async (orderData: any) => {
    if (!isAuthenticated) throw new Error("Must be logged in");
    try {
      const response = await api.post('/checkout', {
        payment_method: orderData.paymentMethod || 'card',
        shipping_address: {
          full_name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
          phone: orderData.shippingAddress.phone || '0000000000',
          address: orderData.shippingAddress.address,
          city: orderData.shippingAddress.city,
          state: 'State', // Mocked or get from form
          postal_code: orderData.shippingAddress.postalCode,
        }
      });
      fetchOrders();
      return response.data.order.order_number; // Assuming backend returns order_number
    } catch (e) {
      console.error('Failed to place order', e);
      throw e;
    }
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id || order.order_number === id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
