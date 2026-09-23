import React from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function HeroBanner({ onGoToStudio, onGoToCatalog }) {
  return (
    <section className="hero-banner">
      <div className="container hero-grid">
        {/* Left Column: Headline & CTA */}
        <div>
          <div className="hero-tag">
            <Sparkles size={15} />
            <span>UNISEX CUSTOM ACCESSORIES LAB</span>
          </div>

          <h1 className="hero-title">
            Bukan Aksesoris Pasaran. <br />
            <span className="gradient-text">Create Your Own</span> <br />
            <span className="lime-text">Bag Charm, Gelang & Strap HP.</span>
          </h1>

          <p className="hero-desc">
            Studio kustomisasi modern untuk cewek & cowok. Rancang gantungan tas tactical, gelang rantai monogram, dan tali HP Y2K dengan puluhan pilihan charm, tali paracord, serta huruf nama sesuai gayamu.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onGoToStudio}
            >
              <span>Mulai Rancang Sekarang</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onGoToCatalog}
            >
              <Layers size={18} />
              <span>Lihat Desain Populer</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <h4>100%</h4>
              <p>Hand-Crafted Studio</p>
            </div>
            <div className="stat-item">
              <h4>50+</h4>
              <p>Charms & Spacers</p>
            </div>
            <div className="stat-item">
              <h4>24-48 Jam</h4>
              <p>Estimasi Perakitan</p>
            </div>
            <div className="stat-item">
              <h4>Unisex</h4>
              <p>Streetwear & Y2K</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Visual Card */}
        <div className="hero-visual-card">
          <span className="hero-floating-badge">★ CRAFT LAB 2026</span>

          <div
            style={{
              padding: '24px',
              background: 'radial-gradient(circle at center, #1E2533 0%, #0E121A 100%)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
              <span className="badge badge-cyan">BAG CHARM</span>
              <span className="badge badge-purple">GELANG</span>
              <span className="badge badge-lime">PHONE STRAP</span>
            </div>

            <div
              style={{
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <svg width="240" height="230" viewBox="0 0 240 230" fill="none">
                {/* Visual art of 3 products intersecting */}
                <circle cx="120" cy="60" r="30" stroke="#00F2FE" strokeWidth="5" fill="none" />
                <rect x="110" y="85" width="20" height="75" rx="5" fill="#161B24" stroke="#4FACFE" strokeWidth="2" />
                <path d="M 60 140 C 60 80, 180 80, 180 140" stroke="#A3E635" strokeWidth="8" strokeDasharray="10 4" fill="none" />
                <circle cx="85" cy="180" r="14" fill="#0A0C10" stroke="#A855F7" strokeWidth="3" />
                <text x="85" y="185" fill="#FFFFFF" fontSize="11" textAnchor="middle">★</text>
                <circle cx="155" cy="180" r="14" fill="#0A0C10" stroke="#00F2FE" strokeWidth="3" />
                <text x="155" y="185" fill="#FFFFFF" fontSize="11" textAnchor="middle">🎲</text>
              </svg>
            </div>

            <div style={{ textAlign: 'left', marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Custom Series 01</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tactical Paracord + Chrome Letters</div>
                </div>
                <div style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>Mulai Rp 45.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
