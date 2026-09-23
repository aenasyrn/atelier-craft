import React from 'react';
import { ShieldCheck, Truck, Sparkles, MessageSquare } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Features bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            paddingBottom: '36px',
            marginBottom: '36px',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>100% Custom Handmade</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dirakit satu per satu oleh artisan</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(163, 230, 53, 0.1)', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Material Anti-Karat</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Titanium alloy, stainless & 550 paracord</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Pengiriman Seluruh RI</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SiCepat, JNE, J&T, & Instant Kurir</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>WhatsApp Care</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Konsultasi desain langsung</div>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--gradient-cyber)', color: '#0A0C10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>
                A
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>
                ATELIER 92
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.6 }}>
              Studio aksesoris custom modern unisex dengan konsep "Create Your Own". Bag charm, gelang, dan gantungan HP untuk pria dan wanita yang mengekspresikan karakter personal.
            </p>
          </div>

          <div className="footer-col">
            <h5>Studio Kustom</h5>
            <ul className="footer-links">
              <li><a href="#studio-customizer" onClick={() => onNavigate('studio')}>Custom Bag Charm</a></li>
              <li><a href="#studio-customizer" onClick={() => onNavigate('studio')}>Custom Gelang Rantai</a></li>
              <li><a href="#studio-customizer" onClick={() => onNavigate('studio')}>Custom Gantungan HP</a></li>
              <li><a href="#katalog-inspirasi" onClick={() => onNavigate('catalog')}>Koleksi Inspirasi Drops</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Customer Care</h5>
            <ul className="footer-links">
              <li><a href="#lacak-pesanan" onClick={() => onNavigate('tracking')}>Lacak Pesanan</a></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">Konsultasi WhatsApp</a></li>
              <li><a href="#">Panduan Ukuran Gelang</a></li>
              <li><a href="#">Garansi Perakitan</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Workshop Studio</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Atelier Craft Creative Lab<br />
              Jl. Senopati Raya No. 92<br />
              Kebayoran Baru, Jakarta Selatan<br />
              DKI Jakarta 12190
            </p>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div>© 2026 ATELIER 92 CUSTOM LAB. All rights reserved. Modern Unisex Accessories.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Crafting</span>
            <span>Made with Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
