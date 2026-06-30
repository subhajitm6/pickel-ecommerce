import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

export interface Product {
  id: string;
  title: string;
  price: number;
  image?: string;
  [key: string]: any;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (e) {
      console.error('Failed to fetch cart', e);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (product: any, quantity = 1) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to add items to your cart.',
        icon: 'warning',
        confirmButtonColor: '#5c3a21', // brown color
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-3xl',
          confirmButton: 'rounded-full px-6 py-2 font-bold'
        }
      });
      return;
    }
    try {
      await api.post('/cart', { product_id: product.id, quantity });
      fetchCart();
      setIsCartOpen(true);
    } catch (e) {
      console.error('Failed to add to cart', e);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!isAuthenticated) return;
    try {
      await api.delete(`/cart/${cartItemId}`);
      fetchCart();
    } catch (e) {
      console.error('Failed to remove from cart', e);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!isAuthenticated) return;
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    try {
      await api.put(`/cart/${cartItemId}`, { quantity });
      fetchCart();
    } catch (e) {
      console.error('Failed to update quantity', e);
    }
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + ((Number(item.product?.price) || 0) * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      isCartOpen, setIsCartOpen, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
