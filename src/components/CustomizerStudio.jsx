import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShoppingBag, Plus, Trash2, Check, RefreshCw, AlertCircle, Info, Upload, Image as ImageIcon, Camera, CheckCircle2, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import VisualCanvas from './VisualCanvas';
import { BAG_CHARM_FRAMES, PHOTOSTRIP_LAYOUTS, SAMPLE_FRAME_PHOTOS } from '../data/initialData';

export default function CustomizerStudio({
  products = [],
  charms = [],
  cordColors = [],
  onAddToCart,
  initialConfig = null,
  onResetPreset,
  onBackToFrames,
  currentTemplate = null
}) {
  const currentProduct = products.find((p) => p.type === 'bag_charm') || products[0];

  // Layout & Frame selection states (Matching Image 2)
  const [selectedLayoutId, setSelectedLayoutId] = useState(currentTemplate?.layoutId || 'layout-a');
  const [selectedFrameId, setSelectedFrameId] = useState(
    currentTemplate ? (currentTemplate.type === 'custom_frame' ? currentTemplate.frameId : null) : 'frame-borcelle'
  );
  const [framePhotos, setFramePhotos] = useState([null, null, null, null, null, null]);
  const [zoomMode, setZoomMode] = useState(false);

  // Bag Charm Hardware & Charm customizations
  const [selectedHwId, setSelectedHwId] = useState('');
  const [selectedColor, setSelectedColor] = useState('#111317');
  const [customLetters, setCustomLetters] = useState('');
  const [selectedCharmIds, setSelectedCharmIds] = useState([]);
  const [charmCategoryFilter, setCharmCategoryFilter] = useState('all');
  const [addedToast, setAddedToast] = useState(false);

  // Hidden file inputs for up to 6 photo slots
  const fileInputRef0 = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);
  const fileInputRefs = [fileInputRef0, fileInputRef1, fileInputRef2, fileInputRef3, fileInputRef4, fileInputRef5];

  // Active Layout and Frame resolution
  const activeLayout = PHOTOSTRIP_LAYOUTS.find((l) => l.id === selectedLayoutId) || PHOTOSTRIP_LAYOUTS[0];
  const activeFrame = BAG_CHARM_FRAMES.find((f) => f.id === selectedFrameId) || null;

  // Determine current active slots
  const activeSlots = (selectedFrameId === 'frame-borcelle' || selectedFrameId === 'frame-the-moment')
    ? (activeFrame?.slots || activeLayout.slots)
    : activeLayout.slots;

  const slotCount = activeSlots.length;

  // Active hardware
  const activeHardware = currentProduct?.hardwareFinishes.find((h) => h.id === selectedHwId) || currentProduct?.hardwareFinishes[0];

  useEffect(() => {
    if (initialConfig) {
      if (initialConfig.layoutId) setSelectedLayoutId(initialConfig.layoutId);
      if (initialConfig.frameId) setSelectedFrameId(initialConfig.frameId);
      if (initialConfig.framePhotos) setFramePhotos(initialConfig.framePhotos);
      if (initialConfig.hardwareId) setSelectedHwId(initialConfig.hardwareId);
      if (initialConfig.cordColor) setSelectedColor(initialConfig.cordColor);
      if (initialConfig.customLetters) setCustomLetters(initialConfig.customLetters);
      if (initialConfig.selectedCharms) setSelectedCharmIds(initialConfig.selectedCharms);
      if (onResetPreset) onResetPreset();
      return;
    }

    if (currentTemplate) {
      if (currentTemplate.type === 'custom_frame') {
        setSelectedFrameId(currentTemplate.frameId);
        setSelectedLayoutId(currentTemplate.layoutId || 'layout-a');
      } else {
        setSelectedFrameId(null);
        setSelectedLayoutId(currentTemplate.layoutId);
      }
    }

    if (currentProduct?.hardwareFinishes && !selectedHwId) {
      setSelectedHwId(currentProduct.hardwareFinishes[0]?.id || '');
    }
  }, [currentProduct, initialConfig, currentTemplate]);

  // Selected charms objects
  const selectedCharmsObjects = selectedCharmIds
    .map((id) => charms.find((c) => c.id === id))
    .filter(Boolean);

  // Price Calculation
  const basePrice = currentProduct?.basePrice || 59000;
  const charmsPrice = selectedCharmsObjects.reduce((acc, c) => acc + (c.price || 0), 0);
  const totalPrice = basePrice + charmsPrice;
  const maxCharms = 6;
  const maxLetters = 6;

  // Layout change handler
  const handleSelectLayout = (layoutId) => {
    setSelectedLayoutId(layoutId);
    if (layoutId === 'layout-a') {
      setSelectedFrameId('frame-the-moment');
    } else {
      setSelectedFrameId(null);
    }
  };

  // File Upload Handlers
  const handleTriggerUpload = (slotIndex) => {
    if (fileInputRefs[slotIndex]?.current) {
      fileInputRefs[slotIndex].current.click();
    }
  };

  const handleFileUpload = (slotIndex, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setFramePhotos((prev) => {
        const next = [...prev];
        next[slotIndex] = dataUrl;
        return next;
      });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemovePhoto = (slotIndex) => {
    setFramePhotos((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  const handleUseSamplePhotos = () => {
    const samples = [...SAMPLE_FRAME_PHOTOS, ...SAMPLE_FRAME_PHOTOS];
    setFramePhotos(samples.slice(0, 6));
  };

  const handleClearAllPhotos = () => {
    setFramePhotos([null, null, null, null, null, null]);
  };

  // Charm selection handlers
  const handleToggleCharm = (charm) => {
    if (charm.stock <= 0) return;
    if (selectedCharmIds.includes(charm.id)) {
      setSelectedCharmIds(selectedCharmIds.filter((id) => id !== charm.id));
    } else {
      if (selectedCharmIds.length >= maxCharms) {
        alert(`Batas maksimal charm untuk bag charm adalah ${maxCharms} item.`);
        return;
      }
      setSelectedCharmIds([...selectedCharmIds, charm.id]);
    }
  };

  const handleRemoveCharm = (id) => {
    setSelectedCharmIds(selectedCharmIds.filter((item) => item !== id));
  };

  // Add to Bag action
  const handleAddToCart = () => {
    const layoutName = selectedFrameId === 'frame-borcelle'
      ? 'Borcelle Vintage Mosaic'
      : (selectedFrameId === 'frame-the-moment' ? 'The Moment Classic' : activeLayout.name);

    const itemPayload = {
      productType: 'bag_charm',
      title: `Custom Photostrip Bag Charm — ${layoutName}`,
      baseName: `${layoutName} (${slotCount} Pose)`,
      baseId: selectedFrameId || selectedLayoutId,
      layoutId: selectedLayoutId,
      frameId: selectedFrameId,
      frameName: layoutName,
      frameImage: activeFrame ? activeFrame.image : null,
      framePhotos: framePhotos.slice(0, slotCount),
      hardwareName: activeHardware?.name || 'Liquid Chrome Silver',
      hardwareId: activeHardware?.id || 'hw-chrome-silver',
      hardwareColor: activeHardware?.color || '#DCE2E6',
      cordColor: selectedColor,
      customLetters: customLetters.toUpperCase().trim(),
      charms: selectedCharmsObjects.map((c) => ({
        id: c.id,
        name: c.name,
        price: c.price,
        icon: c.icon
      })),
      unitPrice: totalPrice,
      quantity: 1,
      subtotal: totalPrice
    };

    onAddToCart(itemPayload);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F43F5E', '#00F2FE', '#A3E635', '#FFFFFF']
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3500);
  };

  const filteredCharms = charms.filter((c) => {
    if (charmCategoryFilter === 'all') return true;
    return c.category === charmCategoryFilter;
  });

  return (
    <section className="customizer-section" id="studio-customizer">
      <div className="container">
        {/* Top Header & Breadcrumb Bar with Back Button (Gambar Kedua) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px',
            padding: '16px 22px',
            background: 'rgba(18, 34, 54, 0.85)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onBackToFrames}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              ← Kembali ke Pilihan Frame
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Template Terpilih:</span>
              <span className="badge badge-cyan" style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                {activeFrame ? activeFrame.name : activeLayout.name} ({slotCount} Slot Foto)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={onBackToFrames}
              style={{
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-full)',
                padding: '8px 14px'
              }}
            >
              Ganti Frame / Layout
            </button>
          </div>
        </div>

        {/* Studio Grid: Canvas Preview (Left) + Customization Engine (Right) */}
        <div className="studio-grid">
          {/* LEFT: Live Visual Canvas */}
          <div className="canvas-container">
            <div className="canvas-toolbar">
              <div className="canvas-live-badge">
                <span className="canvas-live-dot" />
                Live 2D Bag Charm Preview
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSelectedCharmIds([]);
                  setCustomLetters('');
                  handleClearAllPhotos();
                }}
                title="Reset Kustomisasi"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>

            {/* SVG Visualizer with Frame & Photo Slots */}
            <VisualCanvas
              productType="bag_charm"
              baseModel={currentProduct?.bases?.[0]}
              cordColor={selectedColor}
              hardware={activeHardware}
              customLetters={customLetters}
              selectedCharms={selectedCharmsObjects}
              selectedFrame={activeFrame}
              selectedLayoutId={selectedLayoutId}
              framePhotos={framePhotos}
              onSlotClick={(slotIdx) => handleTriggerUpload(slotIdx)}
              zoomMode={zoomMode}
              onToggleZoom={(val) => setZoomMode(val)}
            />

            {/* Blueprint Live Specs */}
            <div className="canvas-spec-card">
              <div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>LAYOUT / FRAME TERPILIH</div>
                <strong style={{ color: 'var(--accent-cyan)' }}>
                  {selectedFrameId === 'frame-borcelle'
                    ? 'Borcelle Vintage Mosaic (3 Oval)'
                    : (selectedFrameId === 'frame-the-moment' ? 'The Moment Classic (3 Rect)' : `${activeLayout.name} (${activeLayout.poseText})`)}
                </strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>ESTIMASI RAKIT</div>
                <span style={{ color: 'var(--accent-lime)', fontWeight: 600 }}>1-2 Hari Kerja</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Step-by-Step Customizer Panel */}
          <div className="config-panel">
            {/* Step 1: Upload Foto ke Slot Frame */}
            <div className="config-step">
              <div className="config-step-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">1</span>
                  <div>
                    <h3 className="config-step-title">Upload Foto ke Slot Layout</h3>
                    <p className="config-step-subtitle">
                      Pilihan: <strong>{selectedFrameId ? activeFrame?.name : activeLayout.name}</strong> ({slotCount} Slot Foto)
                    </p>
                  </div>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                  {framePhotos.slice(0, slotCount).filter(Boolean).length} / {slotCount} Foto Terpasang
                </span>
              </div>

              {/* Hidden File Inputs for Each Slot */}
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  type="file"
                  ref={fileInputRefs[idx]}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(idx, e)}
                />
              ))}

              {/* Dynamic Photo Slot Cards based on slotCount */}
              <div className="photo-slots-grid">
                {activeSlots.map((slot, idx) => {
                  const hasPhoto = Boolean(framePhotos[idx]);
                  const isOval = selectedFrameId === 'frame-borcelle';

                  return (
                    <div key={idx} className="photo-slot-card">
                      <div
                        className={`photo-slot-preview-box ${hasPhoto ? 'has-photo' : ''} ${isOval ? 'is-oval' : ''}`}
                        onClick={() => handleTriggerUpload(idx)}
                        title="Klik untuk memilih foto"
                      >
                        {hasPhoto ? (
                          <img src={framePhotos[idx]} alt={slot.label || `Foto ${idx + 1}`} />
                        ) : (
                          <Camera size={18} color="var(--text-muted)" />
                        )}
                      </div>

                      <div className="photo-slot-info">
                        <div className="photo-slot-label">{slot.label || `Slot Foto ${idx + 1}`}</div>
                        <div className="photo-slot-status">
                          {hasPhoto ? (
                            <span style={{ color: 'var(--accent-lime)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Check size={12} /> Foto siap dicetak
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>Belum ada foto</span>
                          )}
                        </div>
                      </div>

                      <div className="photo-slot-actions">
                        <button
                          type="button"
                          className="upload-file-btn"
                          onClick={() => handleTriggerUpload(idx)}
                        >
                          <Upload size={13} />
                          <span>{hasPhoto ? 'Ganti' : 'Pilih Foto'}</span>
                        </button>

                        {hasPhoto && (
                          <button
                            type="button"
                            className="remove-photo-btn"
                            onClick={() => handleRemovePhoto(idx)}
                            title="Hapus foto ini"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sample Photos helper */}
              <div className="sample-photos-row">
                <span style={{ color: 'var(--text-secondary)' }}>Ingin coba preview cepat?</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleUseSamplePhotos}
                  >
                    <Sparkles size={13} /> Pakai Foto Contoh
                  </button>
                  {framePhotos.some(Boolean) && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={handleClearAllPhotos}
                      style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.4)' }}
                    >
                      Reset Foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Hardware Clasp / Carabiner Finish */}
            <div className="config-step">
              <div className="config-step-header">
                <span className="step-num">2</span>
                <div>
                  <h3 className="config-step-title">Pilih Hardware Clasp & Carabiner</h3>
                  <p className="config-step-subtitle">Finishing logam alloy aerospace anti-karat</p>
                </div>
              </div>

              <div className="swatch-group">
                {currentProduct?.hardwareFinishes?.map((hw) => (
                  <button
                    key={hw.id}
                    type="button"
                    className={`color-swatch-btn ${selectedHwId === hw.id ? 'selected' : ''}`}
                    onClick={() => setSelectedHwId(hw.id)}
                  >
                    <span className="color-circle" style={{ background: hw.color }} />
                    <span>{hw.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Cord / Strap Accent Color */}
            <div className="config-step">
              <div className="config-step-header">
                <span className="step-num">3</span>
                <div>
                  <h3 className="config-step-title">Pilih Warna Tali Paracord / Aksen</h3>
                  <p className="config-step-subtitle">Aksen tali pengait samping untuk gantungan tas</p>
                </div>
              </div>

              <div className="swatch-group">
                {cordColors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`color-swatch-btn ${selectedColor === c.hex ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(c.hex)}
                  >
                    <span className="color-circle" style={{ background: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Custom Initials / Name Beads */}
            <div className="config-step">
              <div className="config-step-header">
                <span className="step-num">4</span>
                <div>
                  <h3 className="config-step-title">Inisial / Nama Kustom (Opsional)</h3>
                  <p className="config-step-subtitle">
                    Maksimal {maxLetters} karakter huruf/angka (Gratis termasuk dalam paket)
                  </p>
                </div>
              </div>

              <div className="letters-input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '180px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}
                  maxLength={maxLetters}
                  placeholder="Contoh: KNOT"
                  value={customLetters}
                  onChange={(e) => setCustomLetters(e.target.value.replace(/[^A-Za-z0-9]/g, ''))}
                />

                <div className="letters-beads-preview">
                  {customLetters.length === 0 ? (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Preview manik huruf akan muncul di sini...
                    </span>
                  ) : (
                    customLetters
                      .toUpperCase()
                      .split('')
                      .map((l, idx) => (
                        <div key={idx} className="letter-bead-cube">
                          {l}
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Step 5: Charms & Pendants Selection */}
            <div className="config-step">
              <div className="config-step-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="step-num">5</span>
                  <div>
                    <h3 className="config-step-title">Pilih Charms & Pendants Gantung</h3>
                    <p className="config-step-subtitle">
                      Terpilih: {selectedCharmIds.length} / {maxCharms} slot
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="charms-filter-tabs">
                {[
                  { id: 'all', label: 'Semua Koleksi' },
                  { id: 'metal', label: 'Chrome & Metal' },
                  { id: 'cyber', label: 'Cyberpunk' },
                  { id: 'streetwear', label: 'Streetwear' },
                  { id: 'y2k', label: 'Y2K Acid' },
                  { id: 'stone', label: 'Batu Alam' },
                  { id: 'beads', label: 'Beads & Spacers' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`filter-pill ${charmCategoryFilter === tab.id ? 'active' : ''}`}
                    onClick={() => setCharmCategoryFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Charms Grid */}
              <div className="charms-grid">
                {filteredCharms.map((charm) => {
                  const isSelected = selectedCharmIds.includes(charm.id);
                  const isOutOfStock = charm.stock <= 0;

                  return (
                    <div
                      key={charm.id}
                      className={`charm-card ${isSelected ? 'selected' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
                      onClick={() => !isOutOfStock && handleToggleCharm(charm)}
                    >
                      <span className={`badge charm-stock-tag ${isOutOfStock ? 'badge-rose' : 'badge-neutral'}`}>
                        {isOutOfStock ? 'Habis' : `Stok: ${charm.stock}`}
                      </span>
                      <div className="charm-card-icon">{charm.icon}</div>
                      <div className="charm-card-name">{charm.name}</div>
                      <div className="charm-card-price">+Rp {charm.price.toLocaleString('id-ID')}</div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Charms Tray */}
              {selectedCharmsObjects.length > 0 && (
                <div className="selected-charms-tray">
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    CHARM TERPILIH DI STUDIO:
                  </div>
                  <div className="selected-charms-list">
                    {selectedCharmsObjects.map((c) => (
                      <div key={c.id} className="selected-charm-chip">
                        <span>{c.icon}</span>
                        <span>{c.name}</span>
                        <button
                          type="button"
                          className="remove-charm-btn"
                          onClick={() => handleRemoveCharm(c.id)}
                          title="Hapus Charm"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Add to Bag Sticky Bar */}
            <div className="price-action-bar">
              <div className="price-summary-breakdown">
                <div className="price-row">
                  <span>Custom Photostrip Bag Charm</span>
                  <span>Rp {basePrice.toLocaleString('id-ID')}</span>
                </div>
                {charmsPrice > 0 && (
                  <div className="price-row">
                    <span>Tambahan {selectedCharmsObjects.length} Charm / Beads</span>
                    <span>+Rp {charmsPrice.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="price-row total-row">
                  <span>Total Harga Kustom</span>
                  <span className="price-total-val">Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} />
                <span>Simpan & Tambah ke Keranjang</span>
              </button>

              {addedToast && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(163, 230, 53, 0.15)',
                    border: '1px solid rgba(163, 230, 53, 0.4)',
                    color: 'var(--accent-lime)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <Check size={16} /> Berhasil dimasukkan ke keranjang belanja!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
