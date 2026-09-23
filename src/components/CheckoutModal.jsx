import React, { useState } from 'react';
import { X, Send, QrCode, CreditCard, CheckCircle2, ShieldCheck, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

const COURIER_OPTIONS = [
  { id: 'sicepat-reg', name: 'SiCepat Reguler (2-3 hari)', cost: 10000 },
  { id: 'jnt-reg', name: 'J&T Express Standard (2-3 hari)', cost: 12000 },
  { id: 'jne-yes', name: 'JNE YES Next Day (1 hari)', cost: 18000 },
  { id: 'gosend-instant', name: 'GoSend / Grab Instant (JABODETABEK)', cost: 25000 }
];

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  onCreateOrder,
  onTrackNewOrder
}) {
  if (!isOpen) return null;

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedCourierId, setSelectedCourierId] = useState('sicepat-reg');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  
  // Checkout flow state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  // Calculations
  const itemsSubtotal = cartItems.reduce((acc, i) => acc + (i.subtotal || i.unitPrice * (i.quantity || 1)), 0);
  const activeCourier = COURIER_OPTIONS.find((c) => c.id === selectedCourierId) || COURIER_OPTIONS[0];
  const grandTotal = itemsSubtotal + activeCourier.cost;

  // Handle Submit Order
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert('Mohon isi nama lengkap Anda.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.length < 9) {
      alert('Mohon masukkan nomor WhatsApp aktif yang valid (identitas pesanan).');
      return;
    }
    if (!address.trim()) {
      alert('Mohon masukkan alamat lengkap pengiriman.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderData = {
        customer: {
          name: customerName.trim(),
          whatsapp: whatsapp.trim(),
          address: address.trim(),
          city: city.trim() || 'Indonesia',
          courier: `${activeCourier.name} (Rp ${activeCourier.cost.toLocaleString('id-ID')})`,
          courierCost: activeCourier.cost,
          notes: notes.trim()
        },
        items: cartItems,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'QRIS' ? 'QRIS Instant' : 'Transfer Bank',
        paymentProofUrl: paymentProofUrl || null
      };

      const order = onCreateOrder(orderData);
      setCreatedOrder(order);
      setIsSubmitting(false);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  // WhatsApp Order payload message
  const generateWhatsAppMessage = () => {
    if (!createdOrder) return '';
    const itemLines = createdOrder.items.map(
      (it, idx) =>
        `${idx + 1}. *${it.title}* (Qty: ${it.quantity || 1}) - Rp ${(it.subtotal || it.unitPrice).toLocaleString('id-ID')}\n` +
        `   • Hardware: ${it.hardwareName}\n` +
        `   • Inisial: ${it.customLetters || '-'}\n` +
        `   • Charms: ${it.charms?.map((c) => c.name).join(', ') || 'Tanpa charm tambahan'}`
    ).join('\n\n');

    const msg = `Halo Atelier Craft Lab! Saya mau konfirmasi pesanan custom saya:\n\n` +
      `*NOMOR ORDER:* ${createdOrder.id}\n` +
      `*Nama Pemesan:* ${createdOrder.customer.name}\n` +
      `*No. WhatsApp:* ${createdOrder.customer.whatsapp}\n` +
      `*Alamat:* ${createdOrder.customer.address}, ${createdOrder.customer.city}\n` +
      `*Ekspedisi:* ${createdOrder.customer.courier}\n` +
      `*Metode Bayar:* ${createdOrder.paymentMethod}\n\n` +
      `*Detail Item Kustom:*\n${itemLines}\n\n` +
      `*TOTAL PEMBAYARAN: Rp ${createdOrder.totalAmount.toLocaleString('id-ID')}*\n\n` +
      `Mohon segera diproses perakitannya ya kak. Terima kasih!`;

    return encodeURIComponent(msg);
  };

  const handleCopyOrderId = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.id);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>Checkout Tanpa Registrasi</span>
            <h3 style={{ fontSize: '1.25rem' }}>
              {createdOrder ? 'Pesanan Berhasil Dibuat!' : 'Pengiriman & Pembayaran'}
            </h3>
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

        {/* BODY */}
        <div style={{ padding: '24px' }}>
          {createdOrder ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div>
              <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(163, 230, 53, 0.15)',
                    color: 'var(--accent-lime)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    border: '2px solid rgba(163, 230, 53, 0.4)'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Terima Kasih, {createdOrder.customer.name}!</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Pesanan custommu telah terdaftar di sistem antrean perakitan Atelier Studio.
                </p>
              </div>

              {/* Order ID Badge Box */}
              <div
                style={{
                  background: 'var(--bg-primary)',
                  border: '1px dashed var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    KODE / NOMOR IDENTITAS PESANAN:
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                    {createdOrder.id}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    WhatsApp: {createdOrder.customer.whatsapp}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleCopyOrderId}
                >
                  <Copy size={14} />
                  <span>{copiedOrderId ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>
              </div>

              {/* WhatsApp Notification CTA Button */}
              <div style={{ marginBottom: '20px' }}>
                <a
                  href={`https://wa.me/6281234567890?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lime btn-lg"
                  style={{ width: '100%', textDecoration: 'none' }}
                >
                  <Send size={18} />
                  <span>Kirim Rincian Pesanan ke WhatsApp Kami</span>
                  <ExternalLink size={14} />
                </a>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '6px' }}>
                  Tim pengerajin kami akan segera memverifikasi detail custom kamu via chat WhatsApp.
                </p>
              </div>

              {/* Track Directly Button */}
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  onClose();
                  onTrackNewOrder(createdOrder.id, createdOrder.customer.whatsapp);
                }}
              >
                <span>Lihat Status Perakitan (Lacak Pesanan)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--accent-cyan)' }}>
                  1. Informasi Penerima & WhatsApp
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Nama Lengkap *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Contoh: Bima Perkasa"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Nomor WhatsApp Aktif *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="081234567890"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '14px' }}>
                  <label className="form-label">Alamat Lengkap Pengiriman *</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Kota / Kabupaten</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Contoh: Jakarta Selatan"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Catatan Khusus Pengerajin</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Contoh: Tali agak dilonggarkan"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Courier Selection */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
                  2. Pilih Ekspedisi Pengiriman
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {COURIER_OPTIONS.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCourierId(c.id)}
                      style={{
                        padding: '12px',
                        background: selectedCourierId === c.id ? 'rgba(0, 242, 254, 0.1)' : 'var(--bg-tertiary)',
                        border: `1px solid ${selectedCourierId === c.id ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '2px' }}>
                        Rp {c.cost.toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
                  3. Metode Pembayaran
                </h4>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                  <button
                    type="button"
                    className={`btn ${paymentMethod === 'QRIS' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => setPaymentMethod('QRIS')}
                  >
                    <QrCode size={18} />
                    <span>QRIS (Semua E-Wallet & Bank)</span>
                  </button>

                  <button
                    type="button"
                    className={`btn ${paymentMethod === 'Bank' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => setPaymentMethod('Bank')}
                  >
                    <CreditCard size={18} />
                    <span>Transfer Bank Manual</span>
                  </button>
                </div>

                {/* QRIS Display View */}
                {paymentMethod === 'QRIS' && (
                  <div
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                      SCAN DENGAN GO-PAY, OVO, DANA, SHOPEEPAY, ATAU MOBILE BANKING
                    </div>
                    {/* Mock QR SVG */}
                    <div
                      style={{
                        width: '150px',
                        height: '150px',
                        margin: '10px auto',
                        background: '#FFFFFF',
                        padding: '10px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="130" height="130" viewBox="0 0 100 100">
                        <rect width="100" height="100" fill="white" />
                        <rect x="10" y="10" width="25" height="25" fill="black" />
                        <rect x="15" y="15" width="15" height="15" fill="white" />
                        <rect x="18" y="18" width="9" height="9" fill="black" />
                        <rect x="65" y="10" width="25" height="25" fill="black" />
                        <rect x="70" y="15" width="15" height="15" fill="white" />
                        <rect x="73" y="18" width="9" height="9" fill="black" />
                        <rect x="10" y="65" width="25" height="25" fill="black" />
                        <rect x="15" y="70" width="15" height="15" fill="white" />
                        <rect x="18" y="73" width="9" height="9" fill="black" />
                        <rect x="42" y="15" width="12" height="12" fill="black" />
                        <rect x="45" y="45" width="16" height="16" fill="#00F2FE" />
                        <rect x="65" y="65" width="25" height="25" fill="black" />
                        <rect x="72" y="40" width="18" height="12" fill="black" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Total Tagihan: <strong style={{ color: 'var(--accent-cyan)' }}>Rp {grandTotal.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>
                )}

                {/* Bank Transfer View */}
                {paymentMethod === 'Bank' && (
                  <div
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px'
                    }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>BCA Atelier Custom Studio</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>8291-0029-4412</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>a.n. PT KROMATIK ATELIER KREASI</div>
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Upload Bukti Transfer (Opsional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-input"
                        style={{ fontSize: '0.8rem', padding: '8px' }}
                        onChange={() => setPaymentProofUrl('bukti-transfer-uploaded.jpg')}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Total & Submit */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal Produk</span>
                  <span>Rp {itemsSubtotal.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Biaya Pengiriman ({activeCourier.name.split('(')[0]})</span>
                  <span>Rp {activeCourier.cost.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total Pembayaran</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>
                    Rp {grandTotal.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi & Buat Pesanan'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
