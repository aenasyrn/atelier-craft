import React from 'react';
import { BarChart3, TrendingUp, Award, DollarSign, PackageCheck, RotateCcw } from 'lucide-react';

export default function AdminReports({ orders = [], charms = [], onResetDemoData }) {
  // Total Revenue
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const completedOrders = orders.filter((o) => o.craftingStatus === 'completed' || o.craftingStatus === 'shipped').length;

  // Breakdown by product category
  let bagCharmCount = 0;
  let gelangCount = 0;
  let phoneStrapCount = 0;

  // Track charm frequencies
  const charmCountMap = {};

  orders.forEach((o) => {
    (o.items || []).forEach((it) => {
      if (it.productType === 'bag_charm') bagCharmCount += it.quantity || 1;
      if (it.productType === 'gelang') gelangCount += it.quantity || 1;
      if (it.productType === 'gantungan_hp') phoneStrapCount += it.quantity || 1;

      (it.charms || []).forEach((ch) => {
        const cName = ch.name || 'Custom Charm';
        charmCountMap[cName] = (charmCountMap[cName] || 0) + (it.quantity || 1);
      });
    });
  });

  const totalCustomItems = bagCharmCount + gelangCount + phoneStrapCount;

  // Sort top charms
  const topCharms = Object.entries(charmCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div>
      {/* Overview Stat Cards */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span>TOTAL OMSET KUSTOM</span>
            <div className="metric-icon-wrap" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="metric-value">Rp {totalRevenue.toLocaleString('id-ID')}</div>
          <div className="metric-sub">Akumulasi seluruh pesanan custom</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>RATA-RATA ORDER (AOV)</span>
            <div className="metric-icon-wrap" style={{ background: 'rgba(163, 230, 53, 0.1)', color: 'var(--accent-lime)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="metric-value">Rp {avgOrderValue.toLocaleString('id-ID')}</div>
          <div className="metric-sub">Rata-rata belanja per customer</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span>TOTAL AKSESORIS DIRAKIT</span>
            <div className="metric-icon-wrap" style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent-purple)' }}>
              <PackageCheck size={18} />
            </div>
          </div>
          <div className="metric-value">{totalCustomItems} pcs</div>
          <div className="metric-sub">Unit kustom unik terpesan</div>
        </div>
      </div>

      {/* Two columns: Category Breakdown & Top Charms */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Category Share */}
        <div className="admin-table-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="var(--accent-cyan)" />
            <span>Distribusi Penjualan per Lini Produk</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Bag Charm (Gantungan Tas)</span>
                <strong>{bagCharmCount} pcs ({totalCustomItems > 0 ? Math.round((bagCharmCount / totalCustomItems) * 100) : 0}%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${totalCustomItems > 0 ? (bagCharmCount / totalCustomItems) * 100 : 0}%`, height: '100%', background: 'var(--accent-cyan)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Gelang (Custom Bracelet)</span>
                <strong>{gelangCount} pcs ({totalCustomItems > 0 ? Math.round((gelangCount / totalCustomItems) * 100) : 0}%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${totalCustomItems > 0 ? (gelangCount / totalCustomItems) * 100 : 0}%`, height: '100%', background: 'var(--accent-purple)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Gantungan HP (Phone Strap)</span>
                <strong>{phoneStrapCount} pcs ({totalCustomItems > 0 ? Math.round((phoneStrapCount / totalCustomItems) * 100) : 0}%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${totalCustomItems > 0 ? (phoneStrapCount / totalCustomItems) * 100 : 0}%`, height: '100%', background: 'var(--accent-lime)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Charms Ranking */}
        <div className="admin-table-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--accent-gold)" />
            <span>Top 5 Charm Paling Diminati Customer</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topCharms.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Belum ada data charm terpesan.</p>
            ) : (
              topCharms.map(([cName, count], idx) => (
                <div
                  key={cName}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 800, color: idx === 0 ? 'var(--accent-gold)' : 'var(--text-secondary)' }}>
                      #{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cName}</span>
                  </div>
                  <span className="badge badge-cyan">{count} kali dipilih</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* System Maintenance / Reset Button */}
      <div
        style={{
          padding: '20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Reset Data Simulasi Toko</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Kembalikan seluruh daftar pesanan, katalog charm, dan status ke pengaturan demo awal.
          </div>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => {
            if (confirm('Apakah Anda yakin ingin me-reset seluruh data ke awal?')) {
              onResetDemoData();
              alert('Data berhasil di-reset ke status demo awal!');
            }
          }}
        >
          <RotateCcw size={14} />
          <span>Reset ke Default Demo</span>
        </button>
      </div>
    </div>
  );
}
