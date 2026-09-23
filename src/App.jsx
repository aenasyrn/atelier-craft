import React, { useState, useEffect } from 'react';
import { store } from './data/store';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FrameLayoutSelector from './components/FrameLayoutSelector';
import CustomizerStudio from './components/CustomizerStudio';
import PresetCatalog from './components/PresetCatalog';
import AccessoriesCatalog from './components/AccessoriesCatalog';
import OrderTracking from './components/OrderTracking';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  // Reactive local snapshot of store
  const [, setTick] = useState(0);

  useEffect(() => {
    // Re-render when store updates
    const unsubscribe = store.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  // UI Navigation states
  const [activeView, setActiveView] = useState('home'); // 'home' | 'studio' | 'catalog' | 'tracking'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoginView, setIsAdminLoginView] = useState(false);
  const [isAdminDashboardView, setIsAdminDashboardView] = useState(false);

  // Template selection state for Bag Charm customizer
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 'frame-borcelle',
    type: 'custom_frame',
    frameId: 'frame-borcelle',
    layoutId: 'layout-a',
    name: 'Borcelle Vintage Mosaic'
  });

  // Studio preset remix config
  const [studioPresetConfig, setStudioPresetConfig] = useState(null);

  // Tracking prefill
  const [trackingPrefill, setTrackingPrefill] = useState({ orderId: '', whatsapp: '' });

  // Store data getters
  const products = store.getProducts();
  const charms = store.getCharms();
  const colors = store.colors;
  const presets = store.getPresets();
  const orders = store.getOrders();
  const cart = store.getCart();
  const isAdmin = store.isAdminLoggedIn();

  // Navigation handlers
  const handleGoToStudio = () => {
    setActiveView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplateFromHome = (template) => {
    setSelectedTemplate(template);
    setActiveView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToFramesFromStudio = () => {
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById('pilih-frame');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleGoToCatalog = () => {
    setActiveView('catalog');
    setTimeout(() => {
      const el = document.getElementById('katalog-aksesoris') || document.getElementById('katalog-inspirasi');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Catalog remix
  const handleRemixPreset = (preset) => {
    setStudioPresetConfig(preset.config);
    setActiveView('studio');
    setTimeout(() => {
      const el = document.getElementById('studio-customizer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Cart actions
  const handleAddToCart = (item) => {
    store.addToCart(item);
  };

  const handleRemoveFromCart = (cartItemId) => {
    store.removeFromCart(cartItemId);
  };

  const handleUpdateCartQuantity = (cartItemId, delta) => {
    store.updateCartQuantity(cartItemId, delta);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCreateOrder = (orderData) => {
    return store.createOrder(orderData);
  };

  const handleTrackNewOrder = (orderId, whatsapp) => {
    setTrackingPrefill({ orderId, whatsapp });
    setActiveView('tracking');
    setTimeout(() => {
      const el = document.getElementById('lacak-pesanan');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Admin handlers
  const handleAdminLogin = (email, password) => {
    const res = store.loginAdmin(email, password);
    if (res.success) {
      setIsAdminLoginView(false);
      setIsAdminDashboardView(true);
    }
    return res;
  };

  const handleAdminLogout = () => {
    store.logoutAdmin();
    setIsAdminDashboardView(false);
  };

  // If Admin Dashboard is open
  if (isAdmin && isAdminDashboardView) {
    return (
      <AdminDashboard
        orders={orders}
        charms={charms}
        products={products}
        onUpdateOrderStatus={(id, updates) => store.updateOrderStatus(id, updates)}
        onAddCharm={(newC) => store.addCharm(newC)}
        onUpdateCharm={(id, up) => store.updateCharm(id, up)}
        onDeleteCharm={(id) => store.deleteCharm(id)}
        onRestockCharm={(id, amt) => store.restockCharm(id, amt)}
        onResetDemoData={() => store.resetToDefault()}
        onLogout={handleAdminLogout}
        onBackToStore={() => setIsAdminDashboardView(false)}
      />
    );
  }

  // If Admin Login screen is open
  if (isAdminLoginView) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <AdminLogin
          onLogin={handleAdminLogin}
          onBackToStore={() => setIsAdminLoginView(false)}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Site Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginView(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardView(true)}
      />

      {/* Main View Router */}
      <main style={{ flexGrow: 1 }}>
        {activeView === 'home' && (
          <>
            <HeroBanner
              onGoToStudio={handleGoToStudio}
              onGoToCatalog={handleGoToCatalog}
            />

            <FrameLayoutSelector
              onSelectTemplate={handleSelectTemplateFromHome}
              selectedTemplateId={selectedTemplate?.id}
            />

            <AccessoriesCatalog
              onAddToCart={handleAddToCart}
            />

            <PresetCatalog
              presets={presets}
              onRemixPreset={handleRemixPreset}
            />

            <OrderTracking
              onLookupOrder={(id, wa) => store.lookupOrder(id, wa)}
              defaultOrderId={trackingPrefill.orderId}
              defaultWhatsapp={trackingPrefill.whatsapp}
            />
          </>
        )}

        {activeView === 'studio' && (
          <div style={{ paddingTop: '20px', paddingBottom: '60px' }}>
            <CustomizerStudio
              products={products}
              charms={charms}
              cordColors={colors}
              onAddToCart={handleAddToCart}
              initialConfig={studioPresetConfig}
              onResetPreset={() => setStudioPresetConfig(null)}
              onBackToFrames={handleBackToFramesFromStudio}
              currentTemplate={selectedTemplate}
            />
          </div>
        )}

        {activeView === 'catalog' && (
          <div style={{ paddingTop: '20px' }}>
            <AccessoriesCatalog
              onAddToCart={handleAddToCart}
            />
            <PresetCatalog
              presets={presets}
              onRemixPreset={handleRemixPreset}
            />
          </div>
        )}

        {activeView === 'tracking' && (
          <div style={{ paddingTop: '20px' }}>
            <OrderTracking
              onLookupOrder={(id, wa) => store.lookupOrder(id, wa)}
              defaultOrderId={trackingPrefill.orderId}
              defaultWhatsapp={trackingPrefill.whatsapp}
            />
          </div>
        )}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={setActiveView} />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onCreateOrder={handleCreateOrder}
        onTrackNewOrder={handleTrackNewOrder}
      />
    </div>
  );
}
