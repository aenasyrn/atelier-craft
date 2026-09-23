import React, { useState } from 'react';
import { Truck, Check, Clock, Eye, AlertCircle, Sparkles, Send, ShieldCheck, Filter } from 'lucide-react';

const CRAFTING_STATUSES = [
  { value: 'pending', label: 'Menunggu Bayar', badge: 'badge-amber' },
  { value: 'paid_verified', label: 'Siap Dirakit', badge: 'badge-cyan' },
  { value: 'in_crafting', label: 'Sedang Dirakit', badge: 'badge-purple' },
  { value: 'quality_check', label: 'Quality Check', badge: 'badge-lime' },
  { value: 'shipped', label: 'Dikirim', badge: 'badge-neutral' },
  { value: 'completed', label: 'Selesai', badge: 'badge-cyan' }
];

export default function AdminOrders({ orders = [], onUpdateOrderStatus }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newTrackingNum, setNewTrackingNum] = useState('');
  const [newCraftNotes, setNewCraftNotes] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.craftingStatus === filterStatus;
  });

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setNewTrackingNum(order.shippingTrackingNumber || '');
    setNewCraftNotes(order.craftingNotes || '');
  };

  const handleSaveOrderUpdates = (statusToUpdate = null) => {
    if (!selectedOrder) return;
    const updates = {
      shippingTrackingNumber: newTrackingNum.trim(),
      craftingNotes: newCraftNotes.trim()
    };
    if (statusToUpdate) {
      updates.craftingStatus = statusToUpdate;
    }
    onUpdateOrderStatus(selectedOrder.id, updates);
    setSelectedOrder({ ...selectedOrder, ...updates });
    alert('Perubahan pesanan berhasil disimpan!');
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Semua ({orders.length})
        </button>
        {CRAFTING_STATUSES.map((st) => {
          const count = orders.filter((o) => o.craftingStatus === st.value).length;
          return (
            <button
              key={st.value}
              type="button"
              className={`filter-pill ${filterStatus === st.value ? 'active' : ''}`}
              onClick={() => setFilterStatus(st.value)}
            >
              {st.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="admin-table-card">
        <div className="admin-table-head">
          <h3 style={{ fontSize: '1.15rem' }}>Daftar Antrean Pesanan Custom</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Menampilkan {filteredOrders.length} pesanan
          </span>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>No. Order</th>
                <th>Tanggal</th>
                <th>Pemesan & WhatsApp</th>
                <th>Item Custom</th>
                <th>Total</th>
                <th>Bayar</th>
                <th>Status Pengerjaan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    Tidak ada pesanan dalam status ini.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const statusObj = CRAFTING_STATUSES.find((s) => s.value === ord.craftingStatus) || CRAFTING_STATUSES[0];
                  return (
                    <tr key={ord.id}>
                      <td>
                        <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                          {ord.id}
                        </strong>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td>
                        <strong>{ord.customer.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {ord.customer.whatsapp}
                        </div>
                      </td>
                      <td>
                        {ord.items.map((it, i) => (
                          <div key={i} style={{ fontSize: '0.82rem', marginBottom: '2px' }}>
                            • {it.title} {it.customLetters && <strong>[{it.customLetters}]</strong>}
                          </div>
                        ))}
                      </td>
                      <td>
                        <strong>Rp {ord.totalAmount.toLocaleString('id-ID')}</strong>
                      </td>
                      <td>
                        <span className={`badge ${ord.paymentStatus === 'paid' ? 'badge-lime' : 'badge-amber'}`}>
                          {ord.paymentStatus === 'paid' ? 'Lunas' : 'Verifikasi'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${statusObj.badge}`}>
                          {statusObj.label}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenDetail(ord)}
                        >
                          <Eye size={14} />
                          <span>Detail</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '4px' }}>Meja Artisan Lab</span>
                <h3 style={{ fontSize: '1.25rem' }}>Detail Pesanan: {selectedOrder.id}</h3>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-icon"
                style={{ width: '34px', height: '34px' }}
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              {/* Customer summary */}
              <div
                style={{
                  background: 'var(--bg-primary)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  fontSize: '0.85rem'
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Pemesan:</div>
                  <strong>{selectedOrder.customer.name}</strong>
                  <div>WhatsApp: {selectedOrder.customer.whatsapp}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Alamat Pengiriman:</div>
                  <div>{selectedOrder.customer.address}, {selectedOrder.customer.city}</div>
                  <div>Ekspedisi: <strong>{selectedOrder.customer.courier}</strong></div>
                </div>
              </div>

              {/* Items Blueprint Breakdown for Crafter */}
              <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
                Daftar Bahan & Komponen Custom untuk Pengerajin:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {selectedOrder.items.map((it, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong>{it.title}</strong>
                      <span className="badge badge-purple">{it.productType.toUpperCase()}</span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      • Base Model: <strong>{it.baseName}</strong> (Warna Tali: {it.cordColor})
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      • Hardware Clasp: <strong>{it.hardwareName}</strong>
                    </div>

                    {it.customLetters && (
                      <div style={{ margin: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem' }}>Manik Huruf Nama:</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {it.customLetters.split('').map((char, cI) => (
                            <span
                              key={cI}
                              style={{
                                padding: '2px 8px',
                                background: '#FFFFFF',
                                color: '#0A0C10',
                                fontWeight: 800,
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Charms / Pendants:</div>
                      {it.charms && it.charms.length > 0 ? (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                          {it.charms.map((ch, cI) => (
                            <span key={cI} className="crafter-component-tag">
                              {ch.icon || '★'} {ch.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tidak ada charm tambahan</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update Actions */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '12px' }}>Update Status Antrean:</h4>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
                  {CRAFTING_STATUSES.map((st) => (
                    <button
                      key={st.value}
                      type="button"
                      className={`btn btn-sm ${selectedOrder.craftingStatus === st.value ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleSaveOrderUpdates(st.value)}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor Resi Pengiriman</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Contoh: SC-98127391-ID / JNE-12938192"
                    value={newTrackingNum}
                    onChange={(e) => setNewTrackingNum(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Catatan Pengerjaan Artisan (Terlihat oleh Customer di Tracking)</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    placeholder="Contoh: Sedang finishing coating anti-karat, estimasi kirim sore ini."
                    value={newCraftNotes}
                    onChange={(e) => setNewCraftNotes(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-lime"
                  style={{ width: '100%', marginTop: '10px' }}
                  onClick={() => handleSaveOrderUpdates()}
                >
                  <Check size={16} />
                  <span>Simpan Perubahan Pesanan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
