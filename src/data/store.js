// State Store with localStorage persistence and reactive pub/sub
import { INITIAL_PRODUCTS, INITIAL_CHARMS, INITIAL_CORD_COLORS, INITIAL_PRESETS, INITIAL_ORDERS } from './initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'atelier_products_v1',
  CHARMS: 'atelier_charms_v1',
  COLORS: 'atelier_colors_v1',
  PRESETS: 'atelier_presets_v1',
  ORDERS: 'atelier_orders_v1',
  CART: 'atelier_cart_v1',
  ADMIN_AUTH: 'atelier_admin_auth_v1'
};

function getStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Storage parse error:', e);
    return fallback;
  }
}

function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

class Store {
  constructor() {
    this.listeners = new Set();
    this.products = getStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.charms = getStorage(STORAGE_KEYS.CHARMS, INITIAL_CHARMS);
    this.colors = getStorage(STORAGE_KEYS.COLORS, INITIAL_CORD_COLORS);
    this.presets = getStorage(STORAGE_KEYS.PRESETS, INITIAL_PRESETS);
    this.orders = getStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    this.cart = getStorage(STORAGE_KEYS.CART, []);
    this.isAdmin = getStorage(STORAGE_KEYS.ADMIN_AUTH, false);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this);
      } catch (err) {
        console.error('Listener notify err:', err);
      }
    });
  }

  // --- Cart Operations ---
  getCart() {
    return this.cart;
  }

  addToCart(item) {
    const cartItem = {
      ...item,
      cartItemId: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
    };
    this.cart = [cartItem, ...this.cart];
    setStorage(STORAGE_KEYS.CART, this.cart);
    this.notify();
    return cartItem;
  }

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter(item => item.cartItemId !== cartItemId);
    setStorage(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }

  updateCartQuantity(cartItemId, delta) {
    this.cart = this.cart.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return {
          ...item,
          quantity: newQty,
          subtotal: item.unitPrice * newQty
        };
      }
      return item;
    });
    setStorage(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }

  clearCart() {
    this.cart = [];
    setStorage(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }

  // --- Order Operations ---
  getOrders() {
    return this.orders;
  }

  createOrder({ customer, items, totalAmount, paymentMethod, paymentProofUrl }) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ATC-${new Date().getFullYear()}-${randomSuffix}`;
    
    // Deduct stock for chosen charms
    items.forEach(orderItem => {
      if (orderItem.charms && Array.isArray(orderItem.charms)) {
        orderItem.charms.forEach(ch => {
          this.deductCharmStock(ch.id || ch.name, orderItem.quantity || 1);
        });
      }
    });

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'Transfer Bank' ? 'pending_verification' : 'paid',
      paymentProofUrl: paymentProofUrl || null,
      craftingStatus: 'in_crafting', // Default to crafting once submitted
      shippingTrackingNumber: '',
      craftingNotes: 'Pesanan baru masuk dari website, siap dirakit di studio.'
    };

    this.orders = [newOrder, ...this.orders];
    setStorage(STORAGE_KEYS.ORDERS, this.orders);
    this.clearCart();
    this.notify();
    return newOrder;
  }

  lookupOrder(orderId, whatsapp) {
    if (!orderId) return null;
    const cleanId = orderId.trim().toUpperCase();
    const cleanWA = whatsapp ? whatsapp.replace(/[^0-9]/g, '') : '';

    return this.orders.find(order => {
      const idMatch = order.id.toUpperCase() === cleanId;
      if (!idMatch) return false;
      if (!cleanWA) return true;
      const orderWA = (order.customer.whatsapp || '').replace(/[^0-9]/g, '');
      return orderWA.endsWith(cleanWA.slice(-6)) || cleanWA.endsWith(orderWA.slice(-6));
    }) || null;
  }

  updateOrderStatus(orderId, updates) {
    this.orders = this.orders.map(order => {
      if (order.id === orderId) {
        return { ...order, ...updates };
      }
      return order;
    });
    setStorage(STORAGE_KEYS.ORDERS, this.orders);
    this.notify();
  }

  // --- Charm & Inventory Operations ---
  getCharms() {
    return this.charms;
  }

  deductCharmStock(charmIdentifier, qty = 1) {
    this.charms = this.charms.map(c => {
      if (c.id === charmIdentifier || c.name === charmIdentifier) {
        const nextStock = Math.max(0, (c.stock || 0) - qty);
        return { ...c, stock: nextStock };
      }
      return c;
    });
    setStorage(STORAGE_KEYS.CHARMS, this.charms);
  }

  updateCharm(charmId, updates) {
    this.charms = this.charms.map(c => {
      if (c.id === charmId) {
        return { ...c, ...updates };
      }
      return c;
    });
    setStorage(STORAGE_KEYS.CHARMS, this.charms);
    this.notify();
  }

  addCharm(newCharm) {
    const item = {
      ...newCharm,
      id: newCharm.id || 'ch-' + Date.now().toString(36)
    };
    this.charms = [...this.charms, item];
    setStorage(STORAGE_KEYS.CHARMS, this.charms);
    this.notify();
    return item;
  }

  deleteCharm(charmId) {
    this.charms = this.charms.filter(c => c.id !== charmId);
    setStorage(STORAGE_KEYS.CHARMS, this.charms);
    this.notify();
  }

  restockCharm(charmId, amount) {
    this.charms = this.charms.map(c => {
      if (c.id === charmId) {
        return { ...c, stock: (c.stock || 0) + Number(amount) };
      }
      return c;
    });
    setStorage(STORAGE_KEYS.CHARMS, this.charms);
    this.notify();
  }

  // --- Base Products ---
  getProducts() {
    return this.products;
  }

  updateProductBasePrice(productId, newBasePrice) {
    this.products = this.products.map(p => {
      if (p.id === productId) {
        return { ...p, basePrice: Number(newBasePrice) };
      }
      return p;
    });
    setStorage(STORAGE_KEYS.PRODUCTS, this.products);
    this.notify();
  }

  // --- Presets ---
  getPresets() {
    return this.presets;
  }

  // --- Admin Auth ---
  isAdminLoggedIn() {
    return this.isAdmin;
  }

  loginAdmin(email, password) {
    if (email.trim().toLowerCase() === 'admin@atelier.id' && password === 'admin123') {
      this.isAdmin = true;
      setStorage(STORAGE_KEYS.ADMIN_AUTH, true);
      this.notify();
      return { success: true };
    }
    return { success: false, message: 'Email atau password admin salah!' };
  }

  logoutAdmin() {
    this.isAdmin = false;
    setStorage(STORAGE_KEYS.ADMIN_AUTH, false);
    this.notify();
  }

  // --- Reset to Demo Data ---
  resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CHARMS);
    localStorage.removeItem(STORAGE_KEYS.COLORS);
    localStorage.removeItem(STORAGE_KEYS.PRESETS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    
    this.products = INITIAL_PRODUCTS;
    this.charms = INITIAL_CHARMS;
    this.colors = INITIAL_CORD_COLORS;
    this.presets = INITIAL_PRESETS;
    this.orders = INITIAL_ORDERS;
    this.cart = [];

    setStorage(STORAGE_KEYS.PRODUCTS, this.products);
    setStorage(STORAGE_KEYS.CHARMS, this.charms);
    setStorage(STORAGE_KEYS.COLORS, this.colors);
    setStorage(STORAGE_KEYS.PRESETS, this.presets);
    setStorage(STORAGE_KEYS.ORDERS, this.orders);
    setStorage(STORAGE_KEYS.CART, this.cart);
    this.notify();
  }
}

export const store = new Store();
