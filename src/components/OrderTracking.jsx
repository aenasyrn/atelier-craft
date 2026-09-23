import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, AlertCircle, Wrench, Sparkles } from 'lucide-react';

const STATUS_STEPS = [
  { key: 'pending', title: 'Pesanan Diterima', desc: 'Menunggu proses verifikasi pembayaran studio' },
  { key: 'paid_verified', title: 'Pembayaran Terverifikasi', desc: 'Detail komponen diteruskan ke meja pengerajin' },
  { key: 'in_crafting', title: 'Sedang Dirakit (Crafting)', desc: 'Artisan merangkai tali, manik huruf, dan charm kustom' },
  { key: 'quality_check', title: 'Quality Control & Finishing', desc: 'Uji kekuatan kait pengait dan kelurusan inisial' },
  { key: 'shipped', title: 'Paket Dikirim', desc: 'Diserahkan ke kurir ekspedisi pilihanmu' },
  { key: 'completed', title: 'Pesanan Selesai', desc: 'Aksesoris telah diterima oleh pemilik' }
];

export default function OrderTracking({
  onLookupOrder,
  defaultOrderId = '',
  defaultWhatsapp = ''
}) {
  const [orderIdInput, setOrderIdInput] = useState(defaultOrderId);
  const [whatsappInput, setWhatsappInput] = useState(defaultWhatsapp);
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (defaultOrderId) {
      setOrderIdInput(defaultOrderId);
      if (defaultWhatsapp) setWhatsappInput(defaultWhatsapp);
      const res = onLookupOrder(defaultOrderId, defaultWhatsapp);
      setSearchedOrder(res);
      setHasSearched(true);
    }
  }, [defaultOrderId, defaultWhatsapp, onLookupOrder]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      alert('Silakan masukkan Nomor Order (contoh: ATC-2026-8912).');
      return;
    }
    const res = onLookupOrder(orderIdInput.trim(), whatsappInput.trim());
    setSearchedOrder(res);
    setHasSearched(true);
  };

  // Helper to determine status progress step
  const getStepProgressIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'paid_verified': return 1;
      case 'in_crafting': return 2;
      case 'quality_check': return 3;
      case 'shipped': return 4;
      case 'completed': return 5;
      default: return 2;
    }
  };

  const activeStepIdx = searchedOrder ? getStepProgressIndex(searchedOrder.craftingStatus) : 0;

  return (
    <section className="tracking-section" id="lacak-pesanan">
      <div className="container">
        <div className="tracking-card">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
              <Search size={13} /> Live Studio Tracker
            </div>
            <h2 style={{ fontSize: '2rem' }}>Lacak Status Pesanan Kustom</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '6px' }}>
              Pantau tahapan pengerjaan aksesoris pesananmu oleh tim artisan Atelier Lab.
            </p>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleSearch} style={{ marginBottom: '36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: '12px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nomor Order (cth: ATC-2026-8912)"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  style={{ textTransform: 'uppercase' }}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="No. WhatsApp (opsional verifikasi)"
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
                <Search size={18} />
                <span>Cari Status</span>
              </button>
            </div>
          </form>

          {/* Search Result */}
          {hasSearched && (
            <div>
              {!searchedOrder ? (
                <div
                  style={{
                    padding: '36px',
                    textAlign: 'center',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <AlertCircle size={36} color="var(--accent-rose)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Pesanan Tidak Ditemukan</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Pastikan Nomor Order dan Nomor WhatsApp sudah sesuai dengan yang tercantum saat checkout.
                  </p>
                  <div style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Coba salah satu order demo: <strong>ATC-2026-8912</strong> atau <strong>ATC-2026-9045</strong>
                  </div>
                </div>
              ) : (
                /* ORDER TIMELINE & DETAILS */
                <div>
                  {/* Order Top Banner */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 24px',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '28px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                        NOMOR ORDER AKTIF
                      </div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                        {searchedOrder.id}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Pemesan: <strong>{searchedOrder.customer.name}</strong> ({searchedOrder.customer.whatsapp})
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-lime" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                        {STATUS_STEPS[activeStepIdx]?.title}
                      </span>
                      {searchedOrder.shippingTrackingNumber && (
                        <div style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          No. Resi: <strong style={{ color: 'var(--text-primary)' }}>{searchedOrder.shippingTrackingNumber}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Crafting Notes Alert if present */}
                  {searchedOrder.craftingNotes && (
                    <div
                      style={{
                        padding: '12px 18px',
                        background: 'rgba(0, 242, 254, 0.08)',
                        borderLeft: '4px solid var(--accent-cyan)',
                        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                        fontSize: '0.85rem',
                        marginBottom: '28px'
                      }}
                    >
                      <strong style={{ color: 'var(--accent-cyan)' }}>Catatan Studio: </strong>
                      {searchedOrder.craftingNotes}
                    </div>
                  )}

                  {/* Progress Timeline Stepper */}
                  <div className="timeline-stepper">
                    {STATUS_STEPS.map((step, idx) => {
                      const isCompleted = idx < activeStepIdx;
                      const isCurrent = idx === activeStepIdx;

                      return (
                        <div
                          key={step.key}
                          className={`timeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                        >
                          <div className="step-circle">
                            {isCompleted ? <CheckCircle2 size={20} /> : <span>{idx + 1}</span>}
                          </div>
                          <div className="step-details">
                            <h4 style={{ color: isCurrent ? 'var(--accent-cyan)' : 'inherit' }}>
                              {step.title}
                            </h4>
                            <p>{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Design Blueprint Breakdown */}
                  <div className="blueprint-box">
                    <div className="blueprint-header">
                      <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
                      Blueprint Spesifikasi Item Kustom
                    </div>

                    {searchedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 0',
                          borderBottom: idx < searchedOrder.items.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                          <span>{item.title}</span>
                          <span style={{ color: 'var(--accent-cyan)' }}>Rp {(item.subtotal || item.unitPrice).toLocaleString('id-ID')}</span>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Model: {item.baseName} | Hardware: {item.hardwareName}
                          {item.customLetters && (
                            <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>
                              {' '}| Inisial: [{item.customLetters}]
                            </span>
                          )}
                        </div>

                        {item.charms && item.charms.length > 0 && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                            {item.charms.map((ch, cIdx) => (
                              <span
                                key={cIdx}
                                style={{
                                  fontSize: '0.75rem',
                                  padding: '2px 8px',
                                  background: 'var(--bg-secondary)',
                                  borderRadius: '4px',
                                  border: '1px solid var(--border-subtle)'
                                }}
                              >
                                {ch.icon || '★'} {ch.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div>Alamat Pengiriman: <strong>{searchedOrder.customer.address}, {searchedOrder.customer.city}</strong></div>
                      <div>Ekspedisi: <strong>{searchedOrder.customer.courier}</strong></div>
                      {searchedOrder.customer.notes && (
                        <div>Catatan Khusus: <em>"{searchedOrder.customer.notes}"</em></div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
