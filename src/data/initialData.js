// Initial seed data for Atelier Craft Lab
// Unisex Modern Custom Accessories Store

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-bag-charm',
    type: 'bag_charm',
    name: 'Custom Bag Charm',
    subtitle: 'Gantungan Tas Kustom Unisex',
    tagline: 'Tactical, Y2K, or Cyberpunk — Rancang gantungan tas sesuai identitasmu.',
    basePrice: 59000,
    estimatedCraftTime: '1-2 Hari Kerja',
    description: 'Bag charm kokoh dengan material premium carabiner aerospace/alloy, tali paracord 550 militer atau rantai chunky, serta opsi hanging charm & inisial nama.',
    bases: [
      { id: 'base-bc-tactical', name: 'Tactical Paracord Weave', price: 0, previewType: 'paracord', defaultCordColor: '#1A1D20', maxCharms: 6, maxLetters: 6 },
      { id: 'base-bc-chain', name: 'Heavy Cuban Chain', price: 15000, previewType: 'cuban_chain', defaultCordColor: '#A0AEC0', maxCharms: 6, maxLetters: 4 },
      { id: 'base-bc-leather', name: 'Raw Leather & Ring', price: 20000, previewType: 'leather_strap', defaultCordColor: '#3E2723', maxCharms: 5, maxLetters: 5 },
      { id: 'base-bc-hybrid', name: 'Dual Utility Cord + Webbing', price: 12000, previewType: 'hybrid_cord', defaultCordColor: '#00F2FE', maxCharms: 7, maxLetters: 8 }
    ],
    hardwareFinishes: [
      { id: 'hw-matte-black', name: 'Matte Stealth Black', color: '#181A1F', border: '#2D3748' },
      { id: 'hw-chrome-silver', name: 'Liquid Chrome Silver', color: '#DCE2E6', border: '#CBD5E0' },
      { id: 'hw-titanium-gunmetal', name: 'Titanium Gunmetal', color: '#4A5568', border: '#718096' },
      { id: 'hw-antique-gold', name: 'Cyber Gold Brass', color: '#D4AF37', border: '#ECC94B' }
    ]
  },
  {
    id: 'prod-gelang',
    type: 'gelang',
    name: 'Custom Bracelet (Gelang)',
    subtitle: 'Gelang Rantai & Paracord Kustom',
    tagline: 'Kombinasi rantai metal, knot cord, pelat nama, dan charm eksklusif.',
    basePrice: 49000,
    estimatedCraftTime: '1 Hari Kerja',
    description: 'Gelang unisex dengan lock clasp magnetik atau serut paracord adjustable. Nyaman dipakai harian, anti-karat, dan tahan air.',
    bases: [
      { id: 'base-br-cuban', name: 'Cuban Link Chain 8mm', price: 15000, previewType: 'cuban_chain', defaultCordColor: '#CBD5E1', maxCharms: 5, maxLetters: 4 },
      { id: 'base-br-paracord', name: 'Adjustable Sliding Knot Cord', price: 0, previewType: 'paracord', defaultCordColor: '#1E293B', maxCharms: 5, maxLetters: 6 },
      { id: 'base-br-milanese', name: 'Milanese Mesh Band', price: 25000, previewType: 'mesh', defaultCordColor: '#475569', maxCharms: 4, maxLetters: 4 },
      { id: 'base-br-beads', name: 'Obsidian & Hematite Bead Base', price: 18000, previewType: 'beads_loop', defaultCordColor: '#0F172A', maxCharms: 5, maxLetters: 6 }
    ],
    hardwareFinishes: [
      { id: 'hw-matte-black', name: 'Matte Stealth Black', color: '#181A1F', border: '#2D3748' },
      { id: 'hw-chrome-silver', name: 'Liquid Chrome Silver', color: '#DCE2E6', border: '#CBD5E0' },
      { id: 'hw-titanium-gunmetal', name: 'Titanium Gunmetal', color: '#4A5568', border: '#718096' }
    ]
  },
  {
    id: 'prod-gantungan-hp',
    type: 'gantungan_hp',
    name: 'Custom Phone Strap',
    subtitle: 'Gantungan HP & Wristlet Lanyard',
    tagline: 'Pencegah jatuh estetik untuk smartphone, sling bag, atau kunci motor.',
    basePrice: 45000,
    estimatedCraftTime: '1 Hari Kerja',
    description: 'Phone charm & lanyard kompatibel dengan semua jenis casing handphone via tether tab universal anti-putus.',
    bases: [
      { id: 'base-ps-wristlet', name: 'Tactical Wrist Lanyard', price: 0, previewType: 'paracord_loop', defaultCordColor: '#0F172A', maxCharms: 6, maxLetters: 8 },
      { id: 'base-ps-beaded', name: 'Chunky Y2K Beads & Acrylic', price: 10000, previewType: 'beads_loop', defaultCordColor: '#94A3B8', maxCharms: 8, maxLetters: 8 },
      { id: 'base-ps-crossbody', name: 'Long Crossbody Rope Strap (120cm)', price: 30000, previewType: 'crossbody', defaultCordColor: '#334155', maxCharms: 5, maxLetters: 6 },
      { id: 'base-ps-mini-charm', name: 'Mini Dangler Loop', price: -5000, previewType: 'mini_loop', defaultCordColor: '#64748B', maxCharms: 4, maxLetters: 5 }
    ],
    hardwareFinishes: [
      { id: 'hw-chrome-silver', name: 'Liquid Chrome Silver', color: '#DCE2E6', border: '#CBD5E0' },
      { id: 'hw-matte-black', name: 'Matte Stealth Black', color: '#181A1F', border: '#2D3748' },
      { id: 'hw-antique-gold', name: 'Cyber Gold Brass', color: '#D4AF37', border: '#ECC94B' }
    ]
  }
];

export const INITIAL_CORD_COLORS = [
  { id: 'col-black', name: 'Obsidian Black', hex: '#111317', textHex: '#ffffff' },
  { id: 'col-silver', name: 'Titanium Silver', hex: '#94A3B8', textHex: '#000000' },
  { id: 'col-neon-lime', name: 'Cyber Neon Lime', hex: '#84CC16', textHex: '#000000' },
  { id: 'col-electric-blue', name: 'Electric Cyan', hex: '#06B6D4', textHex: '#000000' },
  { id: 'col-khaki', name: 'Desert Khaki', hex: '#A89F91', textHex: '#000000' },
  { id: 'col-crimson', name: 'Deep Crimson Red', hex: '#BE123C', textHex: '#ffffff' },
  { id: 'col-purple', name: 'Cyber Violet', hex: '#7C3AED', textHex: '#ffffff' },
  { id: 'col-bone', name: 'Bone White', hex: '#F1F5F9', textHex: '#000000' }
];

export const INITIAL_CHARMS = [
  // Charms - Metal & Cyber (Unisex)
  { id: 'ch-cyber-star', name: 'Cyber Y2K Star', category: 'metal', price: 9000, stock: 48, icon: '★', desc: 'Liontin bintang 4-sudut chrome stainless' },
  { id: 'ch-metal-cross', name: 'Gothic Metal Cross', category: 'metal', price: 12000, stock: 35, icon: '✝', desc: 'Salib detail gothic streetwear finish gunmetal' },
  { id: 'ch-chrome-dice', name: 'Lucky Chrome Dice', category: 'metal', price: 15000, stock: 22, icon: '🎲', desc: 'Dadu 3D metal solid mengkilap' },
  { id: 'ch-astro-tag', name: 'Astronaut Voyager', category: 'cyber', price: 16000, stock: 18, icon: '👨‍🚀', desc: 'Miniatur astronot luar angkasa titanium' },
  { id: 'ch-liquid-drop', name: 'Liquid Metal Drop', category: 'metal', price: 11000, stock: 40, icon: '💧', desc: 'Bentuk lelehan chrome abstrak futuristik' },
  { id: 'ch-flame-tag', name: 'Streetwear Flame', category: 'streetwear', price: 12000, stock: 30, icon: '🔥', desc: 'Plat kobaran api silhouette aesthetic' },
  { id: 'ch-broken-heart', name: 'Y2K Barbed Heart', category: 'y2k', price: 13000, stock: 25, icon: '🖤', desc: 'Hati kawat duri punk modern' },
  { id: 'ch-smiley-pixel', name: 'Acid Smiley Badge', category: 'y2k', price: 10000, stock: 52, icon: '☻', desc: 'Icon senyum retro acid streetwear' },
  { id: 'ch-obsidian-crystal', name: 'Raw Obsidian Rock', category: 'stone', price: 18000, stock: 15, icon: '💎', desc: 'Batu alam obsidian hitam pelindung energi' },
  { id: 'ch-barcode-tag', name: 'Atelier Serial Barcode', category: 'cyber', price: 14000, stock: 28, icon: '|||', desc: 'Plat stainless ukir barcode serial number' },
  { id: 'ch-mini-camera', name: 'Vintage Rangefinder', category: 'streetwear', price: 17000, stock: 12, icon: '📷', desc: 'Kamera analog mini detail 3D' },
  { id: 'ch-compass-rose', name: 'Wayfinder Compass', category: 'metal', price: 14000, stock: 20, icon: '🧭', desc: 'Kompas petualang relief tajam' },

  // Beads & Accent Spacers
  { id: 'bd-matte-onyx', name: 'Matte Onyx Bead (Set of 3)', category: 'beads', price: 8000, stock: 80, icon: '⚫', desc: 'Manik batu onyx matte diameter 8mm' },
  { id: 'bd-chrome-spheres', name: 'Chrome Ball Spacers (Set of 3)', category: 'beads', price: 9000, stock: 65, icon: '⚪', desc: 'Spacer bola metal anti-luntur' },
  { id: 'bd-pearl-accent', name: 'Baroque Fresh Pearl', category: 'beads', price: 12000, stock: 40, icon: '🦪', desc: 'Mutiara air tawar bentuk organik natural' },
  { id: 'bd-neon-cylinder', name: 'Neon Cyber Spacers', category: 'beads', price: 7000, stock: 50, icon: '🟢', desc: 'Silinder akrilik fluorescent glow-in-uv' }
];

export const INITIAL_PRESETS = [
  {
    id: 'preset-1',
    productType: 'bag_charm',
    name: 'Cyberpunk Tactical V1',
    subtitle: 'Streetwear & Utility Unisex Bag Charm',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    price: 98000,
    tags: ['Best Seller', 'Tactical', 'Unisex'],
    config: {
      productType: 'bag_charm',
      baseId: 'base-bc-tactical',
      hardwareId: 'hw-matte-black',
      cordColor: '#111317',
      customLetters: 'CYBER',
      selectedCharms: ['ch-chrome-dice', 'ch-cyber-star', 'ch-barcode-tag']
    }
  },
  {
    id: 'preset-2',
    productType: 'gelang',
    name: 'Chunky Cuban Monogram',
    subtitle: 'Gelang Rantai Heavy Metal & Inisial',
    image: 'https://images.unsplash.com/photo-1611591475155-42e9fba5ce55?auto=format&fit=crop&w=700&q=80',
    price: 89000,
    tags: ['Trending', 'Minimalist', 'Waterproof'],
    config: {
      productType: 'gelang',
      baseId: 'base-br-cuban',
      hardwareId: 'hw-chrome-silver',
      cordColor: '#94A3B8',
      customLetters: 'AT92',
      selectedCharms: ['ch-liquid-drop', 'ch-flame-tag']
    }
  },
  {
    id: 'preset-3',
    productType: 'gantungan_hp',
    name: 'Y2K Acid Dangler Phone Strap',
    subtitle: 'Phone Strap Paracord + Acrylic Beads',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',
    price: 79000,
    tags: ['New Drop', 'Aesthetic', 'Glow'],
    config: {
      productType: 'gantungan_hp',
      baseId: 'base-ps-wristlet',
      hardwareId: 'hw-chrome-silver',
      cordColor: '#84CC16',
      customLetters: 'AURA',
      selectedCharms: ['ch-smiley-pixel', 'ch-cyber-star', 'bd-chrome-spheres']
    }
  },
  {
    id: 'preset-4',
    productType: 'bag_charm',
    name: 'Raw Obsidian & Voyager Charm',
    subtitle: 'Kombinasi Kulit Asli & Batu Alam',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80',
    price: 115000,
    tags: ['Premium', 'Dark Aesthetic', 'Unisex'],
    config: {
      productType: 'bag_charm',
      baseId: 'base-bc-leather',
      hardwareId: 'hw-titanium-gunmetal',
      cordColor: '#111317',
      customLetters: 'VOID',
      selectedCharms: ['ch-astro-tag', 'ch-obsidian-crystal']
    }
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ATC-2026-8912',
    createdAt: '2026-09-22T14:20:00Z',
    customer: {
      name: 'Rian Pratama',
      whatsapp: '081234567890',
      address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
      city: 'Jakarta Selatan',
      courier: 'SiCepat Reguler (Rp 10.000)',
      courierCost: 10000,
      notes: 'Tolong inisial hurufnya agak rapat ya kak'
    },
    items: [
      {
        id: 'item-8912-1',
        productType: 'bag_charm',
        title: 'Custom Bag Charm — Tactical Paracord',
        baseName: 'Tactical Paracord Weave',
        hardwareName: 'Matte Stealth Black',
        cordColor: '#111317',
        customLetters: 'RIAN',
        charms: [
          { name: 'Lucky Chrome Dice', price: 15000 },
          { name: 'Cyber Y2K Star', price: 9000 }
        ],
        unitPrice: 83000,
        quantity: 1,
        subtotal: 83000
      }
    ],
    totalAmount: 93000,
    paymentMethod: 'QRIS Instant',
    paymentStatus: 'paid', // 'unpaid', 'paid', 'verified'
    craftingStatus: 'in_crafting', // 'pending', 'paid_verified', 'in_crafting', 'quality_check', 'shipped', 'completed'
    shippingTrackingNumber: 'SC-89218736192-ID',
    craftingNotes: 'Sudah di meja perakitan 2 oleh artisan Budi.'
  },
  {
    id: 'ATC-2026-9045',
    createdAt: '2026-09-23T09:15:00Z',
    customer: {
      name: 'Alika Nabila',
      whatsapp: '085712349988',
      address: 'Cluster Menteng Indah Blok C3, BSD City, Tangerang Selatan',
      city: 'Tangerang Selatan',
      courier: 'J&T Express (Rp 12.000)',
      courierCost: 12000,
      notes: 'Bungkus kado ya kak untuk hadiah ultah cowok saya'
    },
    items: [
      {
        id: 'item-9045-1',
        productType: 'gelang',
        title: 'Custom Gelang — Cuban Link Chain 8mm',
        baseName: 'Cuban Link Chain 8mm',
        hardwareName: 'Liquid Chrome Silver',
        cordColor: '#94A3B8',
        customLetters: 'ALKA',
        charms: [
          { name: 'Liquid Metal Drop', price: 11000 },
          { name: 'Streetwear Flame', price: 12000 }
        ],
        unitPrice: 87000,
        quantity: 1,
        subtotal: 87000
      },
      {
        id: 'item-9045-2',
        productType: 'gantungan_hp',
        title: 'Custom Phone Strap — Y2K Beads',
        baseName: 'Chunky Y2K Beads & Acrylic',
        hardwareName: 'Liquid Chrome Silver',
        cordColor: '#84CC16',
        customLetters: 'NOVA',
        charms: [
          { name: 'Acid Smiley Badge', price: 10000 },
          { name: 'Cyber Y2K Star', price: 9000 }
        ],
        unitPrice: 74000,
        quantity: 1,
        subtotal: 74000
      }
    ],
    totalAmount: 173000,
    paymentMethod: 'Transfer BCA',
    paymentStatus: 'paid',
    craftingStatus: 'quality_check',
    shippingTrackingNumber: '',
    craftingNotes: 'Perakitan selesai, masuk tahap QC ketahanan kait dan kelurusan huruf.'
  },
  {
    id: 'ATC-2026-7833',
    createdAt: '2026-09-21T11:00:00Z',
    customer: {
      name: 'Dimas Satria',
      whatsapp: '081398765432',
      address: 'Apartemen Sudirman Tower A Lt 15, Jl. Jend. Sudirman, Bandung',
      city: 'Bandung',
      courier: 'JNE YES (Rp 18.000)',
      courierCost: 18000,
      notes: 'Mohon segera dikirim'
    },
    items: [
      {
        id: 'item-7833-1',
        productType: 'bag_charm',
        title: 'Custom Bag Charm — Heavy Cuban Chain',
        baseName: 'Heavy Cuban Chain',
        hardwareName: 'Titanium Gunmetal',
        cordColor: '#A0AEC0',
        customLetters: 'DIMZ',
        charms: [
          { name: 'Astronaut Voyager', price: 16000 },
          { name: 'Raw Obsidian Rock', price: 18000 }
        ],
        unitPrice: 108000,
        quantity: 1,
        subtotal: 108000
      }
    ],
    totalAmount: 126000,
    paymentMethod: 'QRIS Instant',
    paymentStatus: 'paid',
    craftingStatus: 'shipped',
    shippingTrackingNumber: 'JNE-BDG-20269910',
    craftingNotes: 'Paket sudah diserahkan ke kurir JNE pukul 16:30.'
  }
];

export const SAMPLE_FRAME_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
];

export const BAG_CHARM_FRAMES = [
  {
    id: 'frame-borcelle',
    name: 'Borcelle Vintage Mosaic',
    subtitle: 'Classic Green Tile & Silver Emblem',
    badge: '3 Slot Oval',
    image: '/frames/frame_borcelle.png',
    slotShape: 'oval',
    slots: [
      { id: 1, label: 'Foto 1 (Atas)', top: '5.9%', left: '7.3%', width: '85.4%', height: '21.5%', borderRadius: '50%' },
      { id: 2, label: 'Foto 2 (Tengah)', top: '30.7%', left: '7.3%', width: '85.4%', height: '21.5%', borderRadius: '50%' },
      { id: 3, label: 'Foto 3 (Bawah)', top: '55.2%', left: '7.3%', width: '85.4%', height: '21.5%', borderRadius: '50%' }
    ],
    accentColor: '#1B4D3E',
    tagline: 'Nuansa vintage mosaic dengan plat silver Borcelle dan 3 jendela foto elips elegan.'
  },
  {
    id: 'frame-the-moment',
    name: 'The Moment Classic',
    subtitle: 'Editorial Warm-Cream Photostrip',
    badge: '3 Slot Persegi',
    image: '/frames/frame_the_moment.png',
    slotShape: 'rect',
    slots: [
      { id: 1, label: 'Foto 1 (Atas)', top: '3.42%', left: '29.9%', width: '59.8%', height: '30.08%', borderRadius: '0px' },
      { id: 2, label: 'Foto 2 (Tengah)', top: '34.86%', left: '29.9%', width: '59.8%', height: '30.08%', borderRadius: '0px' },
      { id: 3, label: 'Foto 3 (Bawah)', top: '66.41%', left: '29.9%', width: '59.8%', height: '30.08%', borderRadius: '0px' }
    ],
    accentColor: '#CBBBA0',
    tagline: 'Gaya strip photobooth minimalis dengan tipografi The Moment dan 3 slot foto portrait.'
  }
];

export const PHOTOSTRIP_LAYOUTS = [
  {
    id: 'layout-a',
    name: 'layout A',
    sizeText: 'Size 6 x 2 Strip',
    poseText: '(3 Pose)',
    slotCount: 3,
    hasRibbon: false,
    badgeText: 'Classic 3-Pose',
    tagline: 'Strip photobooth vertikal klasik 3 foto dengan border putih minimalis',
    slots: [
      { id: 1, label: 'Foto 1 (Atas)' },
      { id: 2, label: 'Foto 2 (Tengah)' },
      { id: 3, label: 'Foto 3 (Bawah)' }
    ],
    previewPhotos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'layout-b',
    name: 'layout B',
    sizeText: 'Size 6 x 2 Strip',
    poseText: '(4 Pose)',
    slotCount: 4,
    hasRibbon: true,
    ribbonText: 'NEW!',
    badgeText: 'Ribbon 4-Pose',
    tagline: 'Strip 4 pose dengan aksen pita ribbon pink aesthetic di tengah',
    slots: [
      { id: 1, label: 'Foto 1 (Atas 1)' },
      { id: 2, label: 'Foto 2 (Atas 2)' },
      { id: 3, label: 'Foto 3 (Bawah 1)' },
      { id: 4, label: 'Foto 4 (Bawah 2)' }
    ],
    previewPhotos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'layout-c',
    name: 'layout C',
    sizeText: 'Size 6 x 2 Strip',
    poseText: '(2 Pose)',
    slotCount: 2,
    hasRibbon: true,
    ribbonText: 'NEW!',
    badgeText: 'Duo Ribbon Pose',
    tagline: 'Strip 2 pose besar dengan aksen pita ribbon pink manis di tengah',
    slots: [
      { id: 1, label: 'Foto 1 (Atas)' },
      { id: 2, label: 'Foto 2 (Bawah)' }
    ],
    previewPhotos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    ]
  },
  {
    id: 'layout-d',
    name: 'layout D',
    sizeText: 'Size 6 x 4 Strip',
    poseText: '(6 Pose)',
    slotCount: 6,
    hasRibbon: true,
    ribbonText: 'NEW!',
    isGrid: true,
    badgeText: 'Grid 6-Pose',
    tagline: 'Strip grid 2 kolom x 3 baris untuk memuat lebih banyak memori foto',
    slots: [
      { id: 1, label: 'Foto 1' },
      { id: 2, label: 'Foto 2' },
      { id: 3, label: 'Foto 3' },
      { id: 4, label: 'Foto 4' },
      { id: 5, label: 'Foto 5' },
      { id: 6, label: 'Foto 6' }
    ],
    previewPhotos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80'
    ]
  }
];

export const ACCESSORIES_CATALOG_ITEMS = [
  // GELANG (BRACELETS)
  {
    id: 'cat-gelang-cuban',
    type: 'gelang',
    category: 'gelang',
    name: 'Pearl Star Charm Bracelet',
    subtitle: 'Pastel Pink Pearl + Star Accent',
    price: 64000,
    rating: 4.9,
    soldCount: 142,
    badge: 'Best Seller',
    image: '/catalog%20gelang/bracelets.jpg',
    description: 'Gelang dengan kombinasi mutiara pastel pink, manik bening, dan charm bintang kecil yang memberi kesan feminine dan dreamy.',
    specs: ['Pearl Pink & Crystal Beads', 'Star Charm Detail', 'Soft Girly Aesthetic']
  },
  {
    id: 'cat-gelang-paracord',
    type: 'gelang',
    category: 'gelang',
    name: 'White Pearl & Silver Star Bracelet',
    subtitle: 'Pearl Minimalis dengan Accent Star',
    price: 49000,
    rating: 4.8,
    soldCount: 98,
    badge: 'Trending',
    image: '/catalog%20gelang/gelang%20manik.jpg',
    description: 'Desain pearl putih dengan kombinasi silver star charm, bead crystal, dan detail clean yang cocok untuk look minimal tetapi tetap statement.',
    specs: ['Freshwater Pearl', 'Silver Star Detail', 'Minimal & Elegant']
  },
  {
    id: 'cat-gelang-milanese',
    type: 'gelang',
    category: 'gelang',
    name: 'Crystal Bloom Bracelet',
    subtitle: 'Transparan + Pearl + Shell Motif',
    price: 74000,
    rating: 5.0,
    soldCount: 76,
    badge: 'Premium',
    image: '/catalog%20gelang/gl%202.jpg',
    description: 'Gelang dengan nuansa clean dan romantis, menampilkan manik crystal bening, pearl creamy, serta motif shell agar terlihat lebih feminin.',
    specs: ['Crystal Glass Beads', 'Pearl Ivory Finish', 'Shell-Inspired Detail']
  },
  {
    id: 'cat-gelang-beads',
    type: 'gelang',
    category: 'gelang',
    name: 'Sage Green Pearl Bracelet',
    subtitle: 'Pearl + Green Glass + Star Charm',
    price: 67000,
    rating: 4.9,
    soldCount: 110,
    badge: 'Fresh Breeze',
    image: '/catalog%20gelang/simple%20beads%20bracelet%F0%9F%8E%80.jpg',
    description: 'Kombinasi pearl creamy, green glass bead, dan star accessory memberi tampilan soft pastel yang fresh, light, dan aesthetic.',
    specs: ['Pastel Green Accent', 'Pearl Ivory', 'Soft Star Detail']
  },

  // PHONE STRAP (GANTUNGAN HP)
  {
    id: 'cat-ps-wristlet',
    type: 'gantungan_hp',
    category: 'gantungan_hp',
    name: 'Velvet Pearl Phone Strap',
    subtitle: 'Soft Glam + Pearl Charm',
    price: 45000,
    rating: 4.9,
    soldCount: 215,
    badge: 'Heavy Duty',
    image: '/catalog%20phonestrep/%40velvet_deww_tt.jpg',
    description: 'Phone strap dengan sentuhan pearl yang lembut dan aesthetic, cocok untuk tampilan glam yang tetap ringan dan nyaman dipakai.',
    specs: ['Soft Pearl Detail', 'Glam Finish', 'Comfort Fit']
  },
  {
    id: 'cat-ps-beaded',
    type: 'gantungan_hp',
    category: 'gantungan_hp',
    name: 'Colorful Pearly Gummy Phone Charm',
    subtitle: 'Pastel Pop + Jelly Beads',
    price: 55000,
    rating: 4.8,
    soldCount: 180,
    badge: 'Y2K Acid',
    image: '/catalog%20phonestrep/Colorful%20Pearly%20Gummy%20Bear%20Phone%20Charm.jpg',
    description: 'Gantungan HP dengan kombinasi warna pastel dan bead gummy yang playful, bikin tampilan ponsel terasa lebih cute dan eye-catching.',
    specs: ['Pastel Jelly Beads', 'Cute Y2K Style', 'Lightweight Build']
  },
  {
    id: 'cat-ps-crossbody',
    type: 'gantungan_hp',
    category: 'gantungan_hp',
    name: 'Silver Black Phone Strap',
    subtitle: 'Minimalist Metal + Dark Edge',
    price: 75000,
    rating: 5.0,
    soldCount: 164,
    badge: 'Best Travel',
    image: '/catalog%20phonestrep/Silver%20Black%20Phone%20Strap.jpg',
    description: 'Phone strap dengan gaya metalikal hitam silver yang sleek dan modern, cocok untuk tampilan minimal yang tetap berani dan edgy.',
    specs: ['Silver Black Finish', 'Minimalist Tone', 'Strong Metal Detail']
  },
  {
    id: 'cat-ps-pearl',
    type: 'gantungan_hp',
    category: 'gantungan_hp',
    name: 'Classic Pearl Phone Strap',
    subtitle: 'Pearl Beads + Clean Ribbon Style',
    price: 59000,
    rating: 4.9,
    soldCount: 88,
    badge: 'New Arrival',
    image: '/catalog%20phonestrep/phone%20strep.jpg',
    description: 'Gantungan HP dengan kombinasi manik pearl dan detail clean, memberi tampilan elegant serta cocok untuk daily use dengan karakter soft feminine.',
    specs: ['Pearl Beads', 'Daily Casual Style', 'Elegant Soft Finish']
  }
];


