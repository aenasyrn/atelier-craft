import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle, Check, RefreshCw, Layers } from 'lucide-react';

export default function AdminInventory({
  charms = [],
  onAddCharm,
  onUpdateCharm,
  onDeleteCharm,
  onRestockCharm
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Charm form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('metal');
  const [price, setPrice] = useState(12000);
  const [stock, setStock] = useState(25);
  const [icon, setIcon] = useState('★');
  const [desc, setDesc] = useState('');

  // Edit Charm inline or modal state
  const [editingCharm, setEditingCharm] = useState(null);

  const filteredCharms = charms.filter((c) => {
    if (filterCategory === 'low_stock') return (c.stock || 0) <= 20;
    if (filterCategory === 'all') return true;
    return c.category === filterCategory;
  });

  const handleCreateCharm = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddCharm({
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
      icon: icon.trim() || '★',
      desc: desc.trim() || 'Aksesoris kustom Atelier'
    });

    setName('');
    setDesc('');
    setShowAddModal(false);
    alert('Komponen baru berhasil ditambahkan ke Studio Kustom!');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingCharm) return;
    onUpdateCharm(editingCharm.id, {
      name: editingCharm.name,
      category: editingCharm.category,
      price: Number(editingCharm.price),
      stock: Number(editingCharm.stock),
      icon: editingCharm.icon,
      desc: editingCharm.desc
    });
    setEditingCharm(null);
  };

  return (
    <div>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Semua Komponen' },
            { id: 'low_stock', label: '⚠️ Stok Menipis (<=20)' },
            { id: 'metal', label: 'Metal' },
            { id: 'cyber', label: 'Cyber' },
            { id: 'streetwear', label: 'Streetwear' },
            { id: 'y2k', label: 'Y2K' },
            { id: 'stone', label: 'Batu Alam' },
            { id: 'beads', label: 'Beads & Spacers' }
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter-pill ${filterCategory === f.id ? 'active' : ''}`}
              onClick={() => setFilterCategory(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          <span>Tambah Komponen Baru</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="admin-table-card">
        <div className="admin-table-head">
          <h3 style={{ fontSize: '1.15rem' }}>Stok Charms, Pendants & Beads Studio</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Total {filteredCharms.length} item aktif
          </span>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ikon</th>
                <th>Nama Komponen</th>
                <th>Kategori</th>
                <th>Harga Satuan</th>
                <th>Sisa Stok</th>
                <th>Status Stok</th>
                <th>Restock Cepat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharms.map((ch) => {
                const isLow = (ch.stock || 0) <= 20;
                const isOut = (ch.stock || 0) <= 0;

                return (
                  <tr key={ch.id}>
                    <td style={{ fontSize: '1.4rem' }}>{ch.icon || '★'}</td>
                    <td>
                      <strong>{ch.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ch.desc}</div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{ch.category}</span>
                    </td>
                    <td>
                      <strong>Rp {(ch.price || 0).toLocaleString('id-ID')}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '1rem', fontWeight: 800 }}>{ch.stock || 0} unit</span>
                    </td>
                    <td>
                      <span className={`badge ${isOut ? 'badge-rose' : isLow ? 'stock-badge-low' : 'stock-badge-good'}`}>
                        {isOut ? 'Habis' : isLow ? 'Menipis' : 'Aman'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => onRestockCharm(ch.id, 10)}
                        >
                          +10
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => onRestockCharm(ch.id, 25)}
                        >
                          +25
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => onRestockCharm(ch.id, 50)}
                        >
                          +50
                        </button>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          onClick={() => setEditingCharm(ch)}
                          title="Edit Komponen"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-icon"
                          style={{ width: '32px', height: '32px', color: 'var(--accent-rose)' }}
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus ${ch.name}?`)) {
                              onDeleteCharm(ch.id);
                            }
                          }}
                          title="Hapus Komponen"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Tambah Charm / Komponen Baru</h3>
              <button
                type="button"
                className="btn btn-outline btn-icon"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCharm} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">Nama Komponen / Charm *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Chrome Mini Skull"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="metal">Metal & Stainless</option>
                    <option value="cyber">Cyberpunk</option>
                    <option value="streetwear">Streetwear</option>
                    <option value="y2k">Y2K Acid</option>
                    <option value="stone">Batu Alam</option>
                    <option value="beads">Beads & Spacers</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Ikon / Simbol Visual (Emoji/Teks)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Contoh: 💀 / ⚡ / ★"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Harga Satuan (Rp) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Jumlah Stok Awal *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Deskripsi Material Singkat</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Stainless steel finishing cermin anti-karat"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <span>Simpan ke Katalog Studio</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCharm && (
        <div className="modal-backdrop" onClick={() => setEditingCharm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Edit Komponen: {editingCharm.name}</h3>
              <button
                type="button"
                className="btn btn-outline btn-icon"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setEditingCharm(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">Nama Komponen</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingCharm.name}
                  onChange={(e) => setEditingCharm({ ...editingCharm, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Harga (Rp)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingCharm.price}
                    onChange={(e) => setEditingCharm({ ...editingCharm, price: Number(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stok Fisik</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingCharm.stock}
                    onChange={(e) => setEditingCharm({ ...editingCharm, stock: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                <span>Update Komponen</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
