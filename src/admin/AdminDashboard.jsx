import React, { useState } from 'react';
import { Package, Layers, BarChart2, LogOut, Store, ShieldCheck, AlertTriangle, Hammer, DollarSign } from 'lucide-react';
import AdminOrders from './AdminOrders';
import AdminInventory from './AdminInventory';
import AdminReports from './AdminReports';

export default function AdminDashboard({
  orders = [],
  charms = [],
  products = [],
  onUpdateOrderStatus,
  onAddCharm,
  onUpdateCharm,
  onDeleteCharm,
  onRestockCharm,
  onResetDemoData,
  onLogout,
  onBackToStore
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('orders');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingCraftingCount = orders.filter((o) => o.craftingStatus === 'in_crafting' || o.craftingStatus === 'paid_verified').length;
  const lowStockCount = charms.filter((c) => (c.stock || 0) <= 20).length;

  return (
    <div className="admin-layout">
      {/* Admin Top Header */}
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--gradient-cyber)',
              color: '#0A0C10',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            ADMIN PANEL
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>ATELIER CRAFT MANAGEMENT</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Logged as: <strong>admin@atelier.id</strong> (Head Artisan)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onBackToStore}
            title="Lihat Tampilan Toko Customer"
          >
            <Store size={15} />
            <span>Lihat Toko</span>
          </button>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
            onClick={onLogout}
            title="Logout dari Admin"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="container" style={{ padding: '28px 24px 60px' }}>
        {/* Key Metrics Bar */}
        <div className="admin-metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span>TOTAL PENDAPATAN</span>
              <div className="metric-icon-wrap" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div className="metric-value">Rp {totalRevenue.toLocaleString('id-ID')}</div>
            <div className="metric-sub">{orders.length} transaksi pesanan</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span>PERLU DIRAKIT</span>
              <div className="metric-icon-wrap" style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent-purple)' }}>
                <Hammer size={18} />
              </div>
            </div>
            <div className="metric-value">{pendingCraftingCount} Pesanan</div>
            <div className="metric-sub">Antrean di meja kerja saat ini</div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span>PERINGATAN STOK</span>
              <div className="metric-icon-wrap" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)' }}>
                <AlertTriangle size={18} />
              </div>
            </div>
            <div className="metric-value">{lowStockCount} Komponen</div>
            <div className="metric-sub">Stok charm & beads &lt; 20 unit</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-nav-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeAdminTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('orders')}
          >
            <Package size={16} />
            <span>Pesanan & Perakitan ({orders.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeAdminTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('inventory')}
          >
            <Layers size={16} />
            <span>Komponen & Stok Charms ({charms.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeAdminTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('reports')}
          >
            <BarChart2 size={16} />
            <span>Laporan & Analitik</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ marginTop: '24px' }}>
          {activeAdminTab === 'orders' && (
            <AdminOrders orders={orders} onUpdateOrderStatus={onUpdateOrderStatus} />
          )}

          {activeAdminTab === 'inventory' && (
            <AdminInventory
              charms={charms}
              onAddCharm={onAddCharm}
              onUpdateCharm={onUpdateCharm}
              onDeleteCharm={onDeleteCharm}
              onRestockCharm={onRestockCharm}
            />
          )}

          {activeAdminTab === 'reports' && (
            <AdminReports
              orders={orders}
              charms={charms}
              onResetDemoData={onResetDemoData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
