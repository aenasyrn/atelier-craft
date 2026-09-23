import React from 'react';
import { ShoppingBag, Compass, Wrench, Search, ShieldCheck, User } from 'lucide-react';

export default function Navbar({
  activeView,
  setActiveView,
  cartCount = 0,
  onOpenCart,
  isAdmin,
  onOpenAdminLogin,
  onOpenAdminDashboard
}) {
  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setActiveView('home')}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--gradient-cyber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0C10',
              fontWeight: 900
            }}
          >
            A
          </div>
          <span>ATELIER 92</span>
          <span className="brand-badge">CUSTOM LAB</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <button
              type="button"
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => setActiveView('home')}
            >
              Beranda
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link ${activeView === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveView('studio')}
            >
              <Wrench size={16} />
              <span>Custom Bag Charm</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link ${activeView === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveView('catalog')}
            >
              <Compass size={16} />
              <span>Katalog Gelang & HP</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`nav-link ${activeView === 'tracking' ? 'active' : ''}`}
              onClick={() => setActiveView('tracking')}
            >
              <Search size={16} />
              <span>Lacak Pesanan</span>
            </button>
          </li>
        </ul>

        {/* Actions: Cart & Admin */}
        <div className="nav-actions">
          {/* Tracking button on mobile */}
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setActiveView('tracking')}
            title="Lacak Pesanan"
            style={{ display: 'inline-flex' }}
          >
            <Search size={16} />
            <span style={{ fontSize: '0.85rem' }}>Lacak</span>
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            className="btn btn-secondary btn-icon cart-btn-indicator"
            onClick={onOpenCart}
            title="Keranjang Belanja"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* Admin Access Button */}
          {isAdmin ? (
            <button
              type="button"
              className="btn btn-lime btn-sm"
              onClick={onOpenAdminDashboard}
              title="Dashboard Pengelola Toko"
            >
              <ShieldCheck size={16} />
              <span>Admin Mode</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onOpenAdminLogin}
              title="Masuk sebagai Admin Toko"
            >
              <User size={15} />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
