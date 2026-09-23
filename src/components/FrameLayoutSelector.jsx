import React from 'react';
import { Sparkles, ArrowRight, Camera, Check } from 'lucide-react';
import { BAG_CHARM_FRAMES, PHOTOSTRIP_LAYOUTS } from '../data/initialData';

export default function FrameLayoutSelector({ onSelectTemplate, selectedTemplateId }) {
  // Combine custom frames from /frames/ and photobooth layouts
  const allTemplates = [
    {
      id: 'frame-borcelle',
      type: 'custom_frame',
      frameId: 'frame-borcelle',
      layoutId: 'layout-a',
      name: 'Borcelle Vintage Mosaic',
      subtitle: 'Size 6 x 2 Strip (3 Pose Oval)',
      badge: '3 Slot Oval',
      badgeClass: 'badge-lime',
      imageSrc: '/frames/frame_borcelle.png',
      isPublicFrame: true,
      description: 'Template eksklusif keramik mosaic hijau tua dengan plat logam Borcelle dan 3 jendela foto elips.'
    },
    {
      id: 'frame-the-moment',
      type: 'custom_frame',
      frameId: 'frame-the-moment',
      layoutId: 'layout-a',
      name: 'The Moment Classic',
      subtitle: 'Size 6 x 2 Strip (3 Pose Persegi)',
      badge: '3 Slot Persegi',
      badgeClass: 'badge-purple',
      imageSrc: '/frames/frame_the_moment.png',
      isPublicFrame: true,
      description: 'Strip photobooth warm-cream editorial dengan tipografi vertikal THE MOMENT dan 3 slot foto portrait.'
    },
    {
      id: 'layout-a',
      type: 'layout',
      frameId: null,
      layoutId: 'layout-a',
      name: 'layout A',
      subtitle: 'Size 6 x 2 Strip (3 Pose)',
      badge: '3 Pose',
      badgeClass: 'badge-cyan',
      imageSrc: '/frames/Black%20and%20White%20Modern%20Film%20Strip%20Bookmark.png',
      previewPhotos: PHOTOSTRIP_LAYOUTS[0].previewPhotos,
      hasRibbon: false,
      description: 'Strip photobooth vertikal klasik 3 foto dengan border putih minimalis.'
    },
    {
      id: 'layout-b',
      type: 'layout',
      frameId: null,
      layoutId: 'layout-b',
      name: 'layout B',
      subtitle: 'Size 6 x 2 Strip (4 Pose)',
      badge: 'NEW! 4 Pose',
      badgeClass: 'badge-rose',
      imageSrc: '/frames/Black%20and%20White%20Vintage%20Photo%20Booth%20Frame%20Bookmark.png',
      previewPhotos: PHOTOSTRIP_LAYOUTS[1].previewPhotos,
      hasRibbon: true,
      ribbonText: 'NEW!',
      description: 'Strip 4 pose vertikal dengan aksen pita ribbon pink aesthetic di tengah.'
    },
    {
      id: 'layout-c',
      type: 'layout',
      frameId: null,
      layoutId: 'layout-c',
      name: 'layout C',
      subtitle: 'Size 6 x 2 Strip (2 Pose)',
      badge: 'NEW! 2 Pose',
      badgeClass: 'badge-rose',
      imageSrc: '/frames/Red%20Black%20and%20White%20Playful%20Friendship%20Photo%20Booth%20Bookmark.png',
      previewPhotos: PHOTOSTRIP_LAYOUTS[2].previewPhotos,
      hasRibbon: true,
      ribbonText: 'NEW!',
      description: 'Strip 2 pose besar dengan aksen pita ribbon pink manis di tengah.'
    },
    {
      id: 'layout-d',
      type: 'layout',
      frameId: null,
      layoutId: 'layout-d',
      name: 'layout D',
      subtitle: 'Size 6 x 4 Strip (6 Pose)',
      badge: '6 Pose Grid',
      badgeClass: 'badge-purple',
      imageSrc: '/frames/Brown%20Gold%20and%20Black%20Vintage%20Memories%20Good%20Times%20Bookmark.png',
      previewPhotos: PHOTOSTRIP_LAYOUTS[3].previewPhotos,
      hasRibbon: true,
      ribbonText: 'NEW!',
      isGrid: true,
      description: 'Strip photobooth lebar 2x3 grid 6 pose dengan pita ribbon pink.'
    }
  ];

  return (
    <section className="section-frame-selector" id="pilih-frame" style={{ paddingTop: '40px', paddingBottom: '70px' }}>
      <div className="container">
        {/* ========================================================
            CHOOSE YOUR LAYOUT - PHOTOBOOTH HEADER (MATCHING IMAGE 1)
            ======================================================== */}
        <div className="choose-layout-container" id="choose-layout">
          {/* Sparkle star decorations */}
          <div className="sparkle-decoration" style={{ top: '24px', left: '36px', fontSize: '1.8rem' }}>✦</div>
          <div className="sparkle-decoration" style={{ top: '38px', right: '48px', fontSize: '2.2rem' }}>✧</div>
          <div className="sparkle-decoration" style={{ bottom: '24px', left: '48px', fontSize: '1.4rem' }}>✧</div>
          <div className="sparkle-decoration" style={{ bottom: '28px', right: '64px', fontSize: '1.8rem' }}>✦</div>

          <div className="choose-layout-header">
            <h2 className="choose-layout-title">choose your layout</h2>
            <p className="choose-layout-note">NOTE: YOU HAVE 3 SECONDS FOR EACH SHOT</p>
            <p style={{ color: '#4B5563', fontSize: '0.88rem', marginTop: '6px' }}>
              Klik salah satu frame di bawah untuk mulai mengunggah foto dan merancang Bag Charm di studio kustomisasi.
            </p>
          </div>

          {/* Frame & Layout Cards Gallery */}
          <div className="photostrip-gallery" aria-label="Pilihan frame foto untuk bag charm">
            {allTemplates.map((template) => {
              const isSelected = selectedTemplateId === template.id;

              return (
                <div
                  key={template.id}
                  className={`photostrip-picker-card ${isSelected ? 'active' : ''}`}
                  onClick={() => onSelectTemplate(template)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectTemplate(template)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Paper Strip Visual */}
                  <div
                    className="photostrip-paper"
                    style={{
                      position: 'relative',
                      background: template.isPublicFrame ? '#FAF8F5' : '#FFFFFF',
                      borderRadius: '8px',
                      padding: '10px 8px 14px 8px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minHeight: '290px'
                    }}
                  >
                    {isSelected && (
                      <span className="photostrip-active-badge">✓ Terpilih</span>
                    )}

                    {template.imageSrc ? (
                      /* Render public frame asset directly */
                      <div
                        style={{
                          width: '100%',
                          height: '240px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '4px',
                          background: '#E5E7EB'
                        }}
                      >
                        <img
                          src={template.imageSrc}
                          alt={template.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            background: 'rgba(0,0,0,0.65)',
                            color: '#FFFFFF',
                            fontSize: '0.68rem',
                            padding: '3px 8px',
                            borderRadius: '999px',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          Frame Template
                        </div>
                      </div>
                    ) : (
                      /* Render Photostrip Preview Slots */
                      <div className="photostrip-slots-wrap" style={{ width: '100%' }}>
                        {template.isGrid ? (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', position: 'relative' }}>
                            {template.previewPhotos.map((imgUrl, pIdx) => (
                              <div key={pIdx} className="photostrip-thumb-slot" style={{ height: '42px' }}>
                                <img src={imgUrl} alt={`Pose ${pIdx + 1}`} />
                              </div>
                            ))}
                            {template.hasRibbon && (
                              <div
                                className="photostrip-ribbon-badge"
                                style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '-4px',
                                  right: '-4px',
                                  transform: 'translateY(-50%)',
                                  zIndex: 3
                                }}
                              >
                                {template.ribbonText}
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {template.id === 'layout-b' ? (
                              <>
                                <div className="photostrip-thumb-slot" style={{ height: '44px' }}>
                                  <img src={template.previewPhotos[0]} alt="Pose 1" />
                                </div>
                                <div className="photostrip-thumb-slot" style={{ height: '44px' }}>
                                  <img src={template.previewPhotos[1]} alt="Pose 2" />
                                </div>
                                <div className="photostrip-ribbon-badge">{template.ribbonText}</div>
                                <div className="photostrip-thumb-slot" style={{ height: '44px' }}>
                                  <img src={template.previewPhotos[2]} alt="Pose 3" />
                                </div>
                                <div className="photostrip-thumb-slot" style={{ height: '44px' }}>
                                  <img src={template.previewPhotos[3]} alt="Pose 4" />
                                </div>
                              </>
                            ) : template.id === 'layout-c' ? (
                              <>
                                <div className="photostrip-thumb-slot" style={{ height: '88px' }}>
                                  <img src={template.previewPhotos[0]} alt="Pose 1" />
                                </div>
                                <div className="photostrip-ribbon-badge">{template.ribbonText}</div>
                                <div className="photostrip-thumb-slot" style={{ height: '88px' }}>
                                  <img src={template.previewPhotos[1]} alt="Pose 2" />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="photostrip-thumb-slot" style={{ height: '58px' }}>
                                  <img src={template.previewPhotos[0]} alt="Pose 1" />
                                </div>
                                <div className="photostrip-thumb-slot" style={{ height: '58px' }}>
                                  <img src={template.previewPhotos[1]} alt="Pose 2" />
                                </div>
                                <div className="photostrip-thumb-slot" style={{ height: '58px' }}>
                                  <img src={template.previewPhotos[2]} alt="Pose 3" />
                                </div>
                              </>
                            )}
                          </>
                        )}
                        <div className="photostrip-footer-text">
                          photobooth <br />
                          <span style={{ fontSize: '0.45rem', color: '#64748B' }}>23.09.2026</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata below card */}
                  <div className="photostrip-meta" style={{ marginTop: '12px', textAlign: 'center' }}>
                    <div className="photostrip-label" style={{ fontSize: '1rem', fontWeight: 800 }}>
                      {template.name}
                    </div>
                    <div className="photostrip-subtext" style={{ fontSize: '0.78rem', color: '#6B7280', margin: '4px 0 0' }}>
                      {template.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
