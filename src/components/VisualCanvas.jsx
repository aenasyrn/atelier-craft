import React from 'react';

export default function VisualCanvas({
  productType = 'bag_charm',
  baseModel,
  cordColor = '#111317',
  hardware,
  customLetters = '',
  selectedCharms = [],
  selectedFrame = null,
  selectedLayoutId = 'layout-a',
  framePhotos = [],
  onSlotClick = null,
  zoomMode = false,
  onToggleZoom = null
}) {
  const hwColor = hardware?.color || '#DCE2E6';
  const hwBorder = hardware?.border || '#A0AEC0';
  const letters = (customLetters || '').toUpperCase().slice(0, 8).split('');

  const isBorcelle = selectedFrame?.id === 'frame-borcelle';
  const isTheMoment = selectedFrame?.id === 'frame-the-moment';
  const isLayoutB = selectedLayoutId === 'layout-b' && !isBorcelle && !isTheMoment;
  const isLayoutC = selectedLayoutId === 'layout-c' && !isBorcelle && !isTheMoment;
  const isLayoutD = selectedLayoutId === 'layout-d' && !isBorcelle && !isTheMoment;

  return (
    <div className="canvas-viewport" id="custom-live-canvas">
      {/* Zoom Mode Toggle Button */}
      {productType === 'bag_charm' && (
        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
          <div className="canvas-view-toggle">
            <button
              type="button"
              className={!zoomMode ? 'active' : ''}
              onClick={() => onToggleZoom && onToggleZoom(false)}
            >
              Charm View
            </button>
            <button
              type="button"
              className={zoomMode ? 'active' : ''}
              onClick={() => onToggleZoom && onToggleZoom(true)}
            >
              Photostrip Zoom
            </button>
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      {productType === 'bag_charm' && zoomMode ? (
        /* DETAIL PHOTOSTRIP ZOOM VIEW (341 x 1024 Aspect) */
        <svg
          className="canvas-svg"
          viewBox="0 0 341 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxHeight: '420px', cursor: 'pointer' }}
        >
          <defs>
            <clipPath id="zoom-slot-oval-1">
              <ellipse cx="170" cy="168" rx="146" ry="110" />
            </clipPath>
            <clipPath id="zoom-slot-oval-2">
              <ellipse cx="170" cy="423" rx="146" ry="110" />
            </clipPath>
            <clipPath id="zoom-slot-oval-3">
              <ellipse cx="170" cy="678" rx="146" ry="110" />
            </clipPath>

            <clipPath id="zoom-slot-rect-1">
              <rect x="24" y="24" width="293" height="290" rx="4" />
            </clipPath>
            <clipPath id="zoom-slot-rect-2">
              <rect x="24" y="330" width="293" height="290" rx="4" />
            </clipPath>
            <clipPath id="zoom-slot-rect-3">
              <rect x="24" y="636" width="293" height="290" rx="4" />
            </clipPath>
          </defs>

          {/* Base Background */}
          {isBorcelle ? (
            <image href="/frames/frame_borcelle.png" x="0" y="0" width="341" height="1024" preserveAspectRatio="none" />
          ) : isTheMoment ? (
            <image href="/frames/frame_the_moment.png" x="0" y="0" width="341" height="1024" preserveAspectRatio="none" />
          ) : (
            <rect x="0" y="0" width="341" height="1024" fill="#FFFFFF" stroke="#111" strokeWidth="4" />
          )}

          {/* Slots Rendering for Borcelle */}
          {isBorcelle ? (
            [0, 1, 2].map((idx) => {
              const cyList = [168, 423, 678];
              const cy = cyList[idx];
              const photo = framePhotos[idx];

              return photo ? (
                <image
                  key={idx}
                  href={photo}
                  x="24"
                  y={cy - 110}
                  width="292"
                  height="220"
                  clipPath={`url(#zoom-slot-oval-${idx + 1})`}
                  preserveAspectRatio="xMidYMid slice"
                  className="slot-canvas-interactive"
                  onClick={() => onSlotClick && onSlotClick(idx)}
                />
              ) : (
                <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                  <ellipse cx="170" cy={cy} rx="146" ry="110" fill="rgba(0, 242, 254, 0.08)" stroke="#00F2FE" strokeWidth="2.5" strokeDasharray="8 6" />
                  <rect x="110" y={cy - 18} width="120" height="36" rx="18" fill="rgba(10, 12, 16, 0.85)" stroke="#00F2FE" strokeWidth="1.5" />
                  <text x="170" y={cy + 5} fill="#00F2FE" fontSize="14" fontWeight="700" textAnchor="middle">+ Klik Foto {idx + 1}</text>
                </g>
              );
            })
          ) : (
            /* Standard 3-Pose / Rectangular Slots Zoom */
            [0, 1, 2].map((idx) => {
              const yList = [24, 330, 636];
              const y = yList[idx];
              const photo = framePhotos[idx];

              return photo ? (
                <image
                  key={idx}
                  href={photo}
                  x={isTheMoment ? '102' : '24'}
                  y={isTheMoment ? (idx === 0 ? 35 : idx === 1 ? 357 : 680) : y}
                  width={isTheMoment ? '204' : '293'}
                  height={isTheMoment ? '308' : '290'}
                  preserveAspectRatio="xMidYMid slice"
                  className="slot-canvas-interactive"
                  onClick={() => onSlotClick && onSlotClick(idx)}
                />
              ) : (
                <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                  <rect
                    x={isTheMoment ? '102' : '24'}
                    y={isTheMoment ? (idx === 0 ? 35 : idx === 1 ? 357 : 680) : y}
                    width={isTheMoment ? '204' : '293'}
                    height={isTheMoment ? '308' : '290'}
                    fill="rgba(0, 242, 254, 0.08)"
                    stroke="#00F2FE"
                    strokeWidth="2.5"
                    strokeDasharray="8 6"
                  />
                  <rect
                    x={isTheMoment ? '144' : '110'}
                    y={isTheMoment ? (idx === 0 ? 170 : idx === 1 ? 490 : 810) : y + 125}
                    width="120"
                    height="36"
                    rx="18"
                    fill="rgba(10, 12, 16, 0.85)"
                    stroke="#00F2FE"
                    strokeWidth="1.5"
                  />
                  <text
                    x={isTheMoment ? '204' : '170'}
                    y={isTheMoment ? (idx === 0 ? 193 : idx === 1 ? 513 : 833) : y + 148}
                    fill="#00F2FE"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    + Klik Foto {idx + 1}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      ) : (
        /* STANDARD BAG CHARM VIEW WITH CARABINER, STRIP & CHARMS */
        <svg
          className="canvas-svg"
          viewBox="0 0 400 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hwGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="50%" stopColor={hwColor} />
              <stop offset="100%" stopColor="#0B0D11" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="cordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={cordColor} stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor={cordColor} stopOpacity="0.95" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
            </filter>

            {/* Borcelle oval clip paths */}
            <clipPath id="bc-slot-1">
              <ellipse cx="172" cy="132" rx="49" ry="37" />
            </clipPath>
            <clipPath id="bc-slot-2">
              <ellipse cx="172" cy="217" rx="49" ry="37" />
            </clipPath>
            <clipPath id="bc-slot-3">
              <ellipse cx="172" cy="301" rx="49" ry="37" />
            </clipPath>
          </defs>

          {/* ---------------- BAG CHARM RENDER ---------------- */}
          {productType === 'bag_charm' && (
            <g filter="url(#glowEffect)">
              {/* Top Carabiner / O-Ring Clasp */}
              <circle cx="172" cy="42" r="26" stroke="url(#hwGrad)" strokeWidth="7" fill="none" />
              <rect x="162" y="16" width="20" height="7" rx="2" fill={hwBorder} />
              <circle cx="172" cy="67" r="4.5" fill={hwBorder} />

              {/* Hardware Connector Ring for Photostrip */}
              <circle cx="172" cy="74" r="7" stroke="url(#hwGrad)" strokeWidth="3" fill="none" />
              <rect x="163" y="74" width="18" height="9" rx="2" fill="url(#hwGrad)" />

              {/* Photostrip Frame Body */}
              <g id="photostrip-group">
                {/* Frame Drop Shadow */}
                <rect x="115" y="78" width="114" height="342" rx="4" fill="#000000" opacity="0.35" />

                {/* Base Frame Rendering */}
                {isBorcelle ? (
                  <image href="/frames/frame_borcelle.png" x="115" y="78" width="114" height="342" preserveAspectRatio="none" />
                ) : isTheMoment ? (
                  <image href="/frames/frame_the_moment.png" x="115" y="78" width="114" height="342" preserveAspectRatio="none" />
                ) : (
                  <>
                    <rect x="115" y="78" width="114" height="342" rx="4" fill="#FFFFFF" stroke="#222" strokeWidth="1.5" />
                    <text x="172" y="408" fill="#111" fontSize="7" fontWeight="bold" textAnchor="middle">photobooth</text>
                  </>
                )}

                {/* Top Eyelet Rivet */}
                <circle cx="172" cy="84" r="3.5" fill="url(#hwGrad)" stroke="#0B0D11" strokeWidth="1" />

                {/* Case 1: Borcelle 3 Oval Slots */}
                {isBorcelle && (
                  [0, 1, 2].map((idx) => {
                    const cyList = [132, 217, 301];
                    const cy = cyList[idx];
                    const photo = framePhotos[idx];

                    return photo ? (
                      <image
                        key={idx}
                        href={photo}
                        x="123"
                        y={cy - 37}
                        width="98"
                        height="74"
                        clipPath={`url(#bc-slot-${idx + 1})`}
                        preserveAspectRatio="xMidYMid slice"
                        className="slot-canvas-interactive"
                        onClick={() => onSlotClick && onSlotClick(idx)}
                      />
                    ) : (
                      <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                        <ellipse cx="172" cy={cy} rx="49" ry="37" fill="rgba(0, 242, 254, 0.05)" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="4 3" />
                        <circle cx="172" cy={cy} r="11" fill="rgba(10, 12, 16, 0.75)" />
                        <text x="172" y={cy + 4} fill="#00F2FE" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                      </g>
                    );
                  })
                )}

                {/* Case 2: Layout B (4 Pose with Pink Ribbon) */}
                {isLayoutB && (
                  <>
                    {[0, 1, 2, 3].map((idx) => {
                      const yList = [88, 154, 248, 314];
                      const y = yList[idx];
                      const photo = framePhotos[idx];

                      return photo ? (
                        <image
                          key={idx}
                          href={photo}
                          x="120"
                          y={y}
                          width="104"
                          height="62"
                          preserveAspectRatio="xMidYMid slice"
                          className="slot-canvas-interactive"
                          onClick={() => onSlotClick && onSlotClick(idx)}
                        />
                      ) : (
                        <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                          <rect x="120" y={y} width="104" height="62" fill="rgba(0, 242, 254, 0.05)" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="4 3" />
                          <text x="172" y={y + 36} fill="#00F2FE" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                        </g>
                      );
                    })}
                    {/* Pink Ribbon in Center */}
                    <rect x="113" y="220" width="118" height="22" rx="3" fill="#F8B4C4" />
                    <text x="172" y="235" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">NEW!</text>
                  </>
                )}

                {/* Case 3: Layout C (2 Pose with Pink Ribbon) */}
                {isLayoutC && (
                  <>
                    {[0, 1].map((idx) => {
                      const yList = [88, 252];
                      const y = yList[idx];
                      const photo = framePhotos[idx];

                      return photo ? (
                        <image
                          key={idx}
                          href={photo}
                          x="120"
                          y={y}
                          width="104"
                          height="128"
                          preserveAspectRatio="xMidYMid slice"
                          className="slot-canvas-interactive"
                          onClick={() => onSlotClick && onSlotClick(idx)}
                        />
                      ) : (
                        <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                          <rect x="120" y={y} width="104" height="128" fill="rgba(0, 242, 254, 0.05)" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="4 3" />
                          <text x="172" y={y + 68} fill="#00F2FE" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
                        </g>
                      );
                    })}
                    {/* Pink Ribbon in Center */}
                    <rect x="113" y="222" width="118" height="24" rx="3" fill="#F8B4C4" />
                    <text x="172" y="238" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.05em">NEW!</text>
                  </>
                )}

                {/* Case 4: Layout D (6 Pose 2x3 Grid with Ribbon) */}
                {isLayoutD && (
                  <>
                    {[0, 1, 2, 3, 4, 5].map((idx) => {
                      const col = idx % 2;
                      const row = Math.floor(idx / 2);
                      const x = col === 0 ? 119 : 173;
                      const y = row === 0 ? 88 : row === 1 ? 184 : 280;
                      const photo = framePhotos[idx];

                      return photo ? (
                        <image
                          key={idx}
                          href={photo}
                          x={x}
                          y={y}
                          width="52"
                          height="90"
                          preserveAspectRatio="xMidYMid slice"
                          className="slot-canvas-interactive"
                          onClick={() => onSlotClick && onSlotClick(idx)}
                        />
                      ) : (
                        <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                          <rect x={x} y={y} width="52" height="90" fill="rgba(0, 242, 254, 0.05)" stroke="#00F2FE" strokeWidth="1.2" strokeDasharray="3 2" />
                          <text x={x + 26} y={y + 48} fill="#00F2FE" fontSize="11" fontWeight="bold" textAnchor="middle">+</text>
                        </g>
                      );
                    })}
                    {/* Pink Ribbon across center */}
                    <rect x="113" y="225" width="118" height="20" rx="2" fill="#F8B4C4" />
                    <text x="172" y="239" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">NEW!</text>
                  </>
                )}

                {/* Case 5: Default / Layout A / The Moment (3 Rect Slots) */}
                {!isBorcelle && !isLayoutB && !isLayoutC && !isLayoutD && (
                  [0, 1, 2].map((idx) => {
                    const yList = [88, 188, 288];
                    const y = isTheMoment ? (idx === 0 ? 88 : idx === 1 ? 195 : 303) : yList[idx];
                    const photo = framePhotos[idx];
                    const x = isTheMoment ? 149 : 120;
                    const w = isTheMoment ? 68 : 104;
                    const h = isTheMoment ? 103 : 94;

                    return photo ? (
                      <image
                        key={idx}
                        href={photo}
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        preserveAspectRatio="xMidYMid slice"
                        className="slot-canvas-interactive"
                        onClick={() => onSlotClick && onSlotClick(idx)}
                      />
                    ) : (
                      <g key={idx} className="slot-canvas-interactive" onClick={() => onSlotClick && onSlotClick(idx)}>
                        <rect x={x} y={y} width={w} height={h} fill="rgba(0, 242, 254, 0.05)" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="4 3" rx="2" />
                        <circle cx={x + w / 2} cy={y + h / 2} r="11" fill="rgba(10, 12, 16, 0.75)" />
                        <text x={x + w / 2} y={y + h / 2 + 4} fill="#00F2FE" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>
                      </g>
                    );
                  })
                )}
              </g>

              {/* Side Charm & Cord Accent Chain */}
              <g id="side-charms-group">
                <path d="M 195 52 Q 255 56 260 78" stroke="url(#hwGrad)" strokeWidth="3" fill="none" />
                <circle cx="260" cy="80" r="5" fill="url(#hwGrad)" />

                {/* Braided cord */}
                <rect x="256" y="84" width="8" height="70" rx="3" fill={cordColor} />
                <line x1="256" y1="94" x2="264" y2="98" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                <line x1="256" y1="110" x2="264" y2="114" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                <line x1="256" y1="126" x2="264" y2="130" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                {/* Letters */}
                {letters.length > 0 && (
                  <g>
                    {letters.map((char, idx) => {
                      const startY = 160 + idx * 20;
                      return (
                        <g key={idx} transform={`translate(250, ${startY})`}>
                          <rect width="20" height="16" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                          <text x="10" y="12" fill="#0A0C10" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="800" textAnchor="middle">
                            {char}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Bottom Charms */}
                {selectedCharms.length > 0 && (
                  <g>
                    <circle cx="260" cy={165 + (letters.length > 0 ? letters.length * 20 : 0)} r="7" stroke="url(#hwGrad)" strokeWidth="2.5" fill="none" />
                    {selectedCharms.map((charm, cIdx) => {
                      const baseY = 175 + (letters.length > 0 ? letters.length * 20 : 0) + cIdx * 38;
                      const charmX = 260 + (cIdx % 2 === 1 ? 16 : -4);

                      return (
                        <g key={charm.id || cIdx} className="dangling-charm-group">
                          <line x1="260" y1={baseY - 10} x2={charmX} y2={baseY + 4} stroke="url(#hwGrad)" strokeWidth="2" />
                          <circle cx={charmX} cy={baseY + 14} r="15" fill="#161B24" stroke="url(#hwGrad)" strokeWidth="2" />
                          <text x={charmX} y={baseY + 19} fill="#F8FAFC" fontSize="13" textAnchor="middle">
                            {charm.icon || '★'}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            </g>
          )}



        {/* ---------------- GELANG (BRACELET) RENDER ---------------- */}
        {productType === 'gelang' && (
          <g filter="url(#glowEffect)">
            {/* Curved Bracelet Wrist Arc */}
            {baseModel?.previewType === 'cuban_chain' ? (
              // Metal Chain Links Curve
              <g>
                <path
                  d="M 80 230 C 80 120, 320 120, 320 230"
                  stroke="url(#hwGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="16 6"
                  fill="none"
                />
              </g>
            ) : baseModel?.previewType === 'beads_loop' ? (
              // Beaded Curve
              <g>
                <path
                  d="M 80 230 C 80 120, 320 120, 320 230"
                  stroke={cordColor}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray="2 18"
                  fill="none"
                />
              </g>
            ) : (
              // Braided Paracord Curve
              <g>
                <path
                  d="M 80 230 C 80 120, 320 120, 320 230"
                  stroke={cordColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 80 230 C 80 120, 320 120, 320 230"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  fill="none"
                />
              </g>
            )}

            {/* Adjustable Slider / Clasp */}
            <g transform="translate(182, 222)">
              <rect width="36" height="16" rx="4" fill="url(#hwGrad)" stroke={hwBorder} strokeWidth="1.5" />
              <circle cx="10" cy="8" r="3" fill="#0A0C10" />
              <circle cx="26" cy="8" r="3" fill="#0A0C10" />
            </g>

            {/* Hanging Cord Tails for Paracord */}
            <line x1="192" y1="238" x2="182" y2="290" stroke={cordColor} strokeWidth="4" strokeLinecap="round" />
            <circle cx="182" cy="290" r="4" fill={hwColor} />
            <line x1="208" y1="238" x2="218" y2="290" stroke={cordColor} strokeWidth="4" strokeLinecap="round" />
            <circle cx="218" cy="290" r="4" fill={hwColor} />

            {/* Center Monogram / Letters on Gelang */}
            {letters.length > 0 && (
              <g transform="translate(200, 142)">
                <rect
                  x={-(letters.length * 14 + 10)}
                  y="-14"
                  width={letters.length * 28 + 20}
                  height="28"
                  rx="6"
                  fill="#0E121A"
                  stroke="url(#hwGrad)"
                  strokeWidth="2"
                />
                {letters.map((char, i) => (
                  <text
                    key={i}
                    x={-(letters.length - 1) * 14 + i * 28}
                    y="6"
                    fill="#F8FAFC"
                    fontSize="14"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {char}
                  </text>
                ))}
              </g>
            )}

            {/* Hanging Charms from Bracelet */}
            {selectedCharms.length > 0 && (
              <g>
                {selectedCharms.map((ch, idx) => {
                  const xPos = 140 + idx * 36;
                  const yPos = 175;
                  return (
                    <g key={idx}>
                      <line x1={xPos} y1={yPos} x2={xPos} y2={yPos + 26} stroke={hwColor} strokeWidth="2" />
                      <circle cx={xPos} cy={yPos + 38} r="15" fill="#141822" stroke="url(#hwGrad)" strokeWidth="2" />
                      <text x={xPos} y={yPos + 43} fill="#FFFFFF" fontSize="13" textAnchor="middle">
                        {ch.icon || '★'}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        )}

        {/* ---------------- GANTUNGAN HP (PHONE STRAP) RENDER ---------------- */}
        {productType === 'gantungan_hp' && (
          <g filter="url(#glowEffect)">
            {/* Phone Tether Insert Tab (Universal Casing Patch) */}
            <rect x="175" y="24" width="50" height="28" rx="5" fill="#1A202C" stroke="#4A5568" strokeWidth="1.5" />
            <rect x="192" y="44" width="16" height="18" rx="2" fill="none" stroke="url(#hwGrad)" strokeWidth="3" />
            <text x="200" y="42" fill="#718096" fontSize="8" fontWeight="800" textAnchor="middle">CASE TAB</text>

            {/* Mini Quick-Release Loop */}
            <path d="M 200 62 L 200 85" stroke="#CBD5E1" strokeWidth="2.5" />
            <circle cx="200" cy="85" r="7" stroke="url(#hwGrad)" strokeWidth="3" fill="none" />

            {/* Phone Strap Loop: Long Oval / Tear drop */}
            <path
              d="M 200 92 C 120 130, 110 320, 200 370 C 290 320, 280 130, 200 92"
              stroke={cordColor}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
            {/* Inner accent thread */}
            <path
              d="M 200 92 C 120 130, 110 320, 200 370 C 290 320, 280 130, 200 92"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              fill="none"
            />

            {/* Letter Beads on Phone Strap Loop */}
            {letters.length > 0 && (
              <g>
                {letters.map((char, i) => {
                  const beadY = 160 + i * 26;
                  return (
                    <g key={i} transform={`translate(130, ${beadY})`}>
                      <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="1.5" />
                      <text x="0" y="4" fill="#0A0C10" fontSize="11" fontWeight="800" textAnchor="middle">
                        {char}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Charms along bottom arc */}
            {selectedCharms.length > 0 && (
              <g>
                {selectedCharms.map((ch, i) => {
                  const angle = (i - (selectedCharms.length - 1) / 2) * 28;
                  const cx = 200 + Math.sin((angle * Math.PI) / 180) * 45;
                  const cy = 370 + Math.cos((angle * Math.PI) / 180) * 22;

                  return (
                    <g key={i}>
                      <line x1="200" y1="370" x2={cx} y2={cy} stroke={hwColor} strokeWidth="1.5" />
                      <circle cx={cx} cy={cy + 8} r="14" fill="#141824" stroke="url(#hwGrad)" strokeWidth="2" />
                      <text x={cx} y={cy + 13} fill="#FFFFFF" fontSize="12" textAnchor="middle">
                        {ch.icon || '✦'}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        )}
      </svg>
      )}
    </div>
  );
}

