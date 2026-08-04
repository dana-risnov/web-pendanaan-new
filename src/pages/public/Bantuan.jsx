import { useState } from 'react'

const FAQS = [
  { q: 'Siapa saja yang dapat mengajukan proposal pada program CFP RIIM?', a: 'Proposal CFP RIIM dapat diajukan oleh peneliti yang berafiliasi dengan institusi riset, perguruan tinggi, atau badan usaha yang memiliki legalitas resmi di Indonesia. Pemohon wajib memiliki NIDN/NIP aktif atau setara dan melampirkan surat dukungan institusi.' },
  { q: 'Berapa lama proses evaluasi proposal berlangsung?', a: 'Proses evaluasi berlangsung dalam dua tahap: seleksi administrasi (7–14 hari kerja) dan evaluasi teknis oleh reviewer (21–30 hari kerja). Hasil akan diumumkan melalui halaman Pengumuman dan notifikasi email terdaftar.' },
  { q: 'Apakah satu peneliti dapat mengajukan lebih dari satu proposal sekaligus?', a: 'Seorang peneliti hanya dapat menjadi Ketua Peneliti pada satu proposal aktif di waktu yang bersamaan. Namun, peneliti tersebut dapat berperan sebagai anggota tim pada proposal lain yang berbeda skema.' },
  { q: 'Bagaimana cara mengetahui status pengajuan proposal saya?', a: 'Status proposal dapat dipantau melalui dashboard akun RisNov Anda setelah login. Kami juga mengirimkan notifikasi email pada setiap perubahan status: diterima, dalam evaluasi, revisi diperlukan, atau disetujui.' },
  { q: 'Apa perbedaan antara CFP RIIM dan CFP Rumah Program?', a: 'CFP RIIM dikelola langsung oleh BRIN dan terbuka secara kompetitif bagi semua institusi yang memenuhi syarat. CFP Rumah Program dikelola oleh unit organisasi riset BRIN dan memiliki tema serta sasaran yang lebih spesifik sesuai roadmap riset masing-masing unit.' },
  { q: 'Bagaimana mekanisme pencairan dana setelah proposal disetujui?', a: 'Setelah proposal disetujui, akan dilakukan penandatanganan kontrak antara BRIN dan institusi penerima. Pencairan dilakukan secara bertahap sesuai termin yang tercantum dalam kontrak, biasanya 40% di awal periode dan sisanya setelah laporan kemajuan diverifikasi.' },
]

const VIDEOS = [
  { title: 'Cara Mendaftar dan Membuat Akun RisNov',    duration: '04:32', views: '12.4K', desc: 'Panduan lengkap pembuatan akun baru, verifikasi email, dan pengisian profil peneliti.' },
  { title: 'Panduan Pengajuan Proposal CFP RIIM',       duration: '07:15', views: '8.9K',  desc: 'Langkah-langkah pengisian dan pengiriman proposal, termasuk upload dokumen pendukung.' },
  { title: 'Tutorial Pengisian Laporan Kemajuan',       duration: '05:48', views: '5.2K',  desc: 'Cara mengisi dan mengirimkan laporan kemajuan riset sesuai periode dalam kontrak.' },
  { title: 'Cara Mendaftar sebagai Reviewer',           duration: '06:20', views: '3.7K',  desc: 'Panduan pendaftaran dan seleksi menjadi reviewer proposal pada program CFR BRIN.' },
  { title: 'Memahami Skema Pendanaan BRIN',             duration: '09:04', views: '15.1K', desc: 'Penjelasan mendalam tentang perbedaan skema CFP RIIM, CFP Rumah Program, dan CFR.' },
  { title: 'Panduan Dokumen Syarat Pengajuan',          duration: '03:55', views: '6.8K',  desc: 'Daftar lengkap dokumen wajib yang harus disiapkan sebelum mengajukan proposal.' },
]

function SectionAnchor({ id }) {
  return <div id={id} style={{ scrollMarginTop: 90 }} />
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: `0.5px solid ${open ? 'var(--red-200)' : 'var(--line)'}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color .15s' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: open ? 'var(--red-50)' : '#fff',
          border: 'none', padding: '18px 20px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16, cursor: 'pointer',
          textAlign: 'left', fontFamily: 'inherit', transition: 'background .15s',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'var(--red-50)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = '#fff' }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>{faq.q}</span>
        <span style={{
          flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
          background: open ? 'var(--red-400)' : 'var(--red-50)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: open ? '#fff' : 'var(--red-400)',
          transform: open ? 'rotate(45deg)' : 'none', transition: 'all .2s',
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 18px', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75 }}>
          {faq.a}
        </div>
      )}
    </div>
  )
}

function VideoCard({ video }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `0.5px solid ${hovered ? 'rgba(0,0,0,0.16)' : 'var(--line)'}`,
          borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
          transition: 'all .15s', boxShadow: hovered ? '0 4px 18px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div style={{
          height: 160, background: 'linear-gradient(135deg, #d4caca, #c8c2c2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform .15s',
            fontSize: 20, paddingLeft: 3,
          }}>▶</div>
          <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 5 }}>
            {video.duration}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginBottom: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: 'var(--red-400)' }}>▶</span> YouTube · BRIN Official
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4, marginBottom: 4 }}>{video.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{video.views} penayangan</div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', maxWidth: 720, width: '90%', position: 'relative' }}>
            <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>✕</button>
            <div style={{ aspectRatio: '16/9', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>▶</div>
            <div style={{ padding: '20px 24px' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{video.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{video.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function NavTab({ label, target }) {
  return (
    <button
      onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}
      style={{
        fontSize: 13.5, padding: '9px 18px', borderRadius: 999,
        border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.65)',
        background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
    >
      {label}
    </button>
  )
}

export default function Bantuan() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'radial-gradient(ellipse 500px 400px at 80% 50%, rgba(226,75,74,0.18), transparent 65%), #0c0a0a',
        padding: '64px 0 56px', position: 'relative', overflow: 'hidden',
      }}>
        <div className="wrap">
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Bantuan &amp; Kontak</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, maxWidth: 540, marginBottom: 28 }}>
            Temukan panduan penggunaan, jawaban atas pertanyaan umum, dan informasi kontak kami di satu tempat
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <NavTab label="Tentang Kami"    target="tentang" />
            <NavTab label="Video Panduan"   target="video" />
            <NavTab label="FAQ"             target="faq" />
            <NavTab label="Kontak & Lokasi" target="kontak" />
          </div>
        </div>
      </div>

      {/* About */}
      <section style={{ padding: '64px 0', borderBottom: '0.5px solid var(--line)' }}>
        <SectionAnchor id="tentang" />
        <div className="wrap">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-400)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>🏢 Tentang Kami</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Direktorat Pendanaan Riset dan Inovasi</h2>
              {['Direktorat Pendanaan Riset dan Inovasi (RisNov) adalah unit di bawah Badan Riset dan Inovasi Nasional (BRIN) yang bertugas mengelola, menyalurkan, dan mengawasi program pendanaan bagi peneliti, lembaga riset, dan mitra industri di seluruh Indonesia.',
                'Kami berkomitmen untuk mendorong ekosistem riset dan inovasi nasional yang berdaya saing global melalui skema pendanaan yang transparan, akuntabel, dan berbasis kinerja.',
                'Platform RisNov hadir untuk memudahkan proses pengajuan, evaluasi, dan pelaporan program pendanaan riset secara digital.',
              ].map((p, i) => <p key={i} style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{p}</p>)}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 28 }}>
                {[['2.4K+','Proposal diterima'],['38','Provinsi terlayani'],['147','Institusi mitra']].map(([v,l]) => (
                  <div key={l} style={{ background: 'var(--bg-soft)', borderRadius: 10, padding: 20, textAlign: 'center', border: '0.5px solid var(--line)' }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--red-600)', marginBottom: 4 }}>{v}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'linear-gradient(140deg, var(--red-50) 0%, #fff 60%)', border: '0.5px solid var(--red-100)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--red-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 24, color: '#fff' }}>✦</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--red-600)' }}>Pendanaan Riset &amp; Inovasi</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Badan Riset dan Inovasi Nasional</div>
                </div>
              </div>
              {[
                ['📍','Alamat','Gedung BJ Habibie, Jl. M.H. Thamrin No.8, Jakarta Pusat 10340'],
                ['🌐','Website resmi','pendanaan.brin.go.id'],
                ['🕐','Jam layanan','Senin – Jumat, 08.00 – 16.00 WIB'],
                ['📅','Tahun berdiri','2021 — sebagai bagian dari BRIN'],
              ].map(([icon,label,value]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: '#fff', borderRadius: 10, border: '0.5px solid var(--line)' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--red-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section style={{ padding: '64px 0', borderBottom: '0.5px solid var(--line)' }}>
        <SectionAnchor id="video" />
        <div className="wrap">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-400)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>▶ Video Panduan</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Tutorial Penggunaan Platform</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, maxWidth: 560, marginBottom: 32 }}>
            Pelajari cara menggunakan platform RisNov mulai dari pendaftaran akun hingga pelaporan hasil riset
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {VIDEOS.map(v => <VideoCard key={v.title} video={v} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 0', borderBottom: '0.5px solid var(--line)' }}>
        <SectionAnchor id="faq" />
        <div className="wrap">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-400)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>❓ FAQ</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Pertanyaan yang Sering Diajukan</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, maxWidth: 560, marginBottom: 32 }}>Tidak menemukan jawaban? Hubungi kami langsung melalui kontak di bawah</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 800 }}>
            {FAQS.map((f, i) => <FaqItem key={i} faq={f} />)}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '64px 0' }}>
        <SectionAnchor id="kontak" />
        <div className="wrap">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-400)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8 }}>📞 Kontak &amp; Lokasi</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 10 }}>Hubungi Kami</h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, maxWidth: 560, marginBottom: 32 }}>Tim kami siap membantu pertanyaan dan kendala Anda seputar program pendanaan riset</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 36, alignItems: 'start' }}>
            <div style={{ background: 'linear-gradient(140deg, var(--red-50) 0%, #fff 60%)', border: '0.5px solid var(--red-100)', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--red-600)', marginBottom: 24, lineHeight: 1.4 }}>Direktorat Pendanaan Riset dan Inovasi — BRIN</div>
              {[
                ['📱','WhatsApp (chat)', '0811-1064-6771'],
                ['✉️','Email','pendanaan-risnov@brin.go.id'],
                ['🕐','Jam layanan','Senin – Jumat, 08.00 – 16.00 WIB'],
                ['📍','Alamat','Gedung BJ Habibie, Jl. M.H. Thamrin No.8, RT.10/RW.1, Kec. Menteng, Jakarta Pusat 10340'],
              ].map(([icon,label,value]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#fff', border: '0.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--ink)' }}>{value}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                {['📸','🐦','▶','in','f'].map((icon, i) => (
                  <div key={i} style={{ width: 38, height: 38, borderRadius: 10, border: '0.5px solid var(--line)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, transition: 'all .15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-400)'; e.currentTarget.style.background = 'var(--red-50)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = '#fff' }}
                  >{icon}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--red-600)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>🗺 Lokasi</div>
              <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginBottom: 16, lineHeight: 1.65 }}>
                Gedung BJ Habibie, Jl. M.H. Thamrin No.8, RT.10/RW.1, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10340
              </p>
              <MapEmbed />
              <a href="https://maps.google.com/?q=Gedung+BJ+Habibie+Jakarta" target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 500, color: 'var(--red-600)', border: '0.5px solid var(--red-200)', background: 'var(--red-50)', padding: '9px 16px', borderRadius: 999 }}>
                🔗 Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: '#0c0a0a', padding: '36px 0', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12.5 }}>
          © 2025 Direktorat Pendanaan Riset dan Inovasi — BRIN. Hak cipta dilindungi.
        </p>
      </footer>
    </div>
  )
}

function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '0.5px solid var(--line)', height: 320, background: 'var(--bg-soft)', cursor: loaded ? 'default' : 'pointer' }}
      onClick={() => setLoaded(true)}
    >
      {loaded ? (
        <iframe
          src="https://www.google.com/maps?q=Gedung+BJ+Habibie+Jl+MH+Thamrin+Jakarta&output=embed"
          width="100%" height="100%" style={{ border: 'none' }} loading="lazy"
          title="Peta lokasi kantor BRIN"
        />
      ) : (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ fontSize: 40, color: '#ccc' }}>🗺</span>
          <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Klik untuk memuat peta Google Maps</p>
        </div>
      )}
    </div>
  )
}
