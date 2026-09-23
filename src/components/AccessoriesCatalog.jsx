import React, { useState } from 'react';
import { ShoppingBag, Star, Check, Sparkles, Shield, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ACCESSORIES_CATALOG_ITEMS } from '../data/initialData';

export default function AccessoriesCatalog({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedItemId, setAddedItemId] = useState(null);

  const filteredItems = ACCESSORIES_CATALOG_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleBuyItem = (item) => {
    const payload = {
      productType: item.type,
      title: item.name,
      baseName: item.subtitle,
      unitPrice: item.price,
      quantity: 1,
      subtotal: item.price,
      image: item.image,
      badge: item.badge
    };

    onAddToCart(payload);

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#00F2FE', '#A3E635', '#F43F5E']
    });

    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 2500);
  };

  return (
    <section className="section-catalog" id="katalog-aksesoris" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-head" style={{ marginBottom: '32px' }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '10px' }}>
              <Sparkles size={12} /> Ready-to-Wear Catalog
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Katalog Gelang & Phone Strap</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '640px' }}>
              Koleksi aksesoris autentik siap pakai. Rantai stainless steel anti-karat, anyaman paracord serut, dan gantungan HP tahan putus.
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignSelf: 'flex-start' }}>
            {[
              { id: 'all', label: 'Semua Koleksi' },
              { id: 'gelang', label: 'Gelang (Bracelets)' },
              { id: 'gantungan_hp', label: 'Phone Strap (Gantungan HP)' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredItems.map((item) => {
            const isAdded = addedItemId === item.id;

            return (
              <div
                key={item.id}
                className="preset-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'visible',
                  transition: 'all 0.25s ease',
                  minHeight: '100%'
                }}
              >
                {/* Product Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#0B0D11', flexShrink: 0 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  {/* Badge */}
                  <span
                    className="badge badge-cyan"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backdropFilter: 'blur(8px)',
                      background: 'rgba(10, 12, 16, 0.75)',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, minHeight: '360px' }}>
                  {/* Rating & Sold count */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#FCD34D', marginBottom: '8px' }}>
                    <Star size={13} fill="#FCD34D" />
                    <strong>{item.rating}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>· {item.soldCount} Terjual</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '10px' }}>
                    {item.subtitle}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px', flex: 1 }}>
                    {item.description}
                  </p>

                  {/* Spec pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {item.specs.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--border-subtle)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>HARGA</div>
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`btn ${isAdded ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                      onClick={() => handleBuyItem(item)}
                      style={{
                        padding: '9px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 700
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} color="var(--accent-lime)" />
                          <span>Masuk Keranjang</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>Beli Sekarang</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
