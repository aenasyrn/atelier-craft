import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartModal({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.subtotal || item.unitPrice * (item.quantity || 1)), 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.25rem' }}>Keranjang Kustom ({cartItems.length})</h3>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-icon"
            style={{ width: '34px', height: '34px' }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: '1.05rem', marginBottom: '8px' }}>Keranjang kustommu masih kosong.</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Rancang aksesoris pertamamu di Studio Kustomisasi!
              </p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item-card">
                  {/* Thumbnail: Photostrip or Color Swatch */}
                  <div className="cart-item-thumb">
                    {item.frameImage ? (
                      <div
                        style={{
                          width: '26px',
                          height: '48px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          border: `1.5px solid ${item.hardwareColor || '#94A3B8'}`,
                          background: '#0B0D11'
                        }}
                      >
                        <img
                          src={item.frameImage}
                          alt={item.frameName || 'Frame'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: item.cordColor || '#111317',
                          border: `2px solid ${item.hardwareColor || '#94A3B8'}`
                        }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-details">
                      {item.frameName ? (
                        <div>
                          Template: <strong style={{ color: 'var(--accent-cyan)' }}>{item.frameName}</strong>
                        </div>
                      ) : null}
                      Hardware: <strong>{item.hardwareName}</strong>
                      {item.customLetters && (
                        <span> | Inisial: <strong style={{ color: 'var(--accent-cyan)' }}>{item.customLetters}</strong></span>
                      )}
                    </div>

                    {/* Frame Photos Thumbnails */}
                    {item.framePhotos && item.framePhotos.some(Boolean) && (
                      <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Foto ({item.framePhotos.filter(Boolean).length}/3):</span>
                        {item.framePhotos.map((photo, pIdx) => (
                          photo ? (
                            <img
                              key={pIdx}
                              src={photo}
                              alt={`Slot ${pIdx + 1}`}
                              style={{
                                width: '20px',
                                height: '24px',
                                borderRadius: '3px',
                                objectFit: 'cover',
                                border: '1px solid var(--accent-cyan)'
                              }}
                            />
                          ) : (
                            <div
                              key={pIdx}
                              style={{
                                width: '20px',
                                height: '24px',
                                borderRadius: '3px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px dashed var(--border-subtle)'
                              }}
                            />
                          )
                        ))}
                      </div>
                    )}

                    {item.charms && item.charms.length > 0 && (
                      <div style={{ marginTop: '4px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {item.charms.map((ch, idx) => (
                          <span key={idx} style={{ fontSize: '0.75rem', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                            {ch.icon} {ch.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="cart-item-price">
                      Rp {(item.unitPrice || 0).toLocaleString('id-ID')}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="qty-counter">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity || 1}
                    </span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="btn btn-outline btn-icon"
                    style={{ width: '36px', height: '36px', borderColor: 'transparent', color: 'var(--accent-rose)' }}
                    onClick={() => onRemoveItem(item.cartItemId)}
                    title="Hapus dari keranjang"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Pesanan (Belum Ongkir)</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                Rp {totalAmount.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              onClick={onProceedCheckout}
            >
              <span>Lanjut ke Pengiriman & Pembayaran</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
