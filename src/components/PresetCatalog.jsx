import React, { useState } from 'react';
import { SlidersHorizontal, ShoppingBag, Eye, Sparkles } from 'lucide-react';

export default function PresetCatalog({ presets = [], onRemixPreset, onDirectAddToCart }) {
  const [filterType, setFilterType] = useState('all');

  const filtered = presets.filter((p) => {
    if (filterType === 'all') return true;
    return p.productType === filterType;
  });

  return (
    <section className="section-catalog" id="katalog-inspirasi">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="badge badge-purple">
              <Sparkles size={12} /> Curated Inspiration Drops
            </div>
            <h2>Katalog Desain Populer</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              Pilih desain jadi siap order, atau jadikan referensi untuk kamu remix di Studio Kustomisasi.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Semua Produk' },
              { id: 'bag_charm', label: 'Bag Charm' },
              { id: 'gelang', label: 'Gelang' },
              { id: 'gantungan_hp', label: 'Gantungan HP' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-pill ${filterType === f.id ? 'active' : ''}`}
                onClick={() => setFilterType(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="catalog-grid">
          {filtered.map((preset) => (
            <div key={preset.id} className="preset-card">
              <div className="preset-img-wrapper">
                <img src={preset.image} alt={preset.name} loading="lazy" />
                <div className="preset-tags">
                  {preset.tags.map((t, idx) => (
                    <span key={idx} className="badge badge-neutral" style={{ backdropFilter: 'blur(8px)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="preset-content">
                <div>
                  <h3 className="preset-title">{preset.name}</h3>
                  <p className="preset-sub">{preset.subtitle}</p>
                </div>

                <div className="preset-footer">
                  <span className="preset-price">Rp {preset.price.toLocaleString('id-ID')}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => onRemixPreset(preset)}
                      title="Buka & sesuaikan desain ini di Studio"
                    >
                      <SlidersHorizontal size={14} />
                      <span>Remix Desain</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
