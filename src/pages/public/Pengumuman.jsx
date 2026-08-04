import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ANNOUNCEMENTS = [
  { id: 1, tag: 'cfp-riim',  title: 'Pengumuman Pembukaan Pusat Kolaborasi Riset Periode 3 Tahun 2025', excerpt: 'BRIN membuka pendaftaran skema Pusat Kolaborasi Riset (PKR) periode ketiga tahun anggaran 2025. Pendaftaran dibuka mulai 12 Juli hingga 15 Agustus 2025.', date: '12 Jul 2025', status: 'dibuka',  icon: '📜' },
  { id: 2, tag: 'cfr',       title: 'Rekrutmen Reviewer Proposal Riset Nasional Gelombang III 2025',    excerpt: 'BRIN membuka kesempatan bagi peneliti berpengalaman untuk bergabung sebagai reviewer proposal pada program pendanaan riset nasional gelombang ketiga.',       date: '8 Jul 2025',  status: 'dibuka',  icon: '👤' },
  { id: 3, tag: 'cfp-rp',   title: 'Persiapan Pembukaan CFP Rumah Program Bidang Energi Baru Terbarukan', excerpt: 'Skema CFP Rumah Program untuk bidang Energi Baru Terbarukan akan segera dibuka. Calon pemohon disarankan mempersiapkan dokumen persyaratan sejak dini.',  date: '5 Jul 2025',  status: 'segera',  icon: '🏢' },
  { id: 4, tag: 'cfp-riim',  title: 'Hasil Seleksi Administrasi RIIM Ekspedisi Gelombang I 2025',       excerpt: 'Pengumuman hasil seleksi administrasi program RIIM Ekspedisi Gelombang I Tahun 2025. Pemohon yang lolos seleksi administrasi diharapkan melengkapi berkas.',    date: '28 Jun 2025', status: 'ditutup', icon: '🏆' },
  { id: 5, tag: 'cfr',       title: 'Pengumuman Reviewer Terpilih Program Pendanaan Riset Nasional 2025', excerpt: 'BRIN mengumumkan daftar reviewer yang telah terpilih untuk mengevaluasi proposal pada program pendanaan riset nasional tahun 2025.',                       date: '20 Jun 2025', status: 'ditutup', icon: '✅' },
  { id: 6, tag: 'cfp-rp',   title: 'Penutupan Pendaftaran CFP Rumah Program Bidang Dirgantara & Antariksa', excerpt: 'Pendaftaran CFP Rumah Program bidang Dirgantara dan Antariksa resmi ditutup. Proposal yang masuk akan memasuki proses evaluasi teknis.',               date: '10 Jun 2025', status: 'ditutup', icon: '🚀' },
]

const TAG_LABELS = {
  'cfp-riim': 'CFP RIIM',
  'cfp-rp':   'CFP Rumah Program',
  'cfr':      'Call for Reviewer',
}

const TAG_COLORS = {
  'cfp-riim': { bg: 'var(--red-50)',  color: 'var(--red-800)',  border: 'var(--red-100)' },
  'cfp-rp':   { bg: 'var(--blue-50)', color: 'var(--blue-700)', border: 'rgba(24,95,165,0.15)' },
  'cfr':      { bg: 'var(--green-50)',color: 'var(--green-700)',border: 'rgba(59,109,17,0.2)' },
}

const STATUS_COLORS = {
  dibuka:  { bg: 'var(--green-50)', color: 'var(--green-800)', border: 'rgba(59,109,17,0.2)', label: 'Dibuka' },
  segera:  { bg: 'var(--amber-50)', color: 'var(--amber-700)', border: 'rgba(133,79,11,0.2)', label: 'Segera' },
  ditutup: { bg: '#F1EFE8',         color: '#444441',           border: 'rgba(0,0,0,0.08)',    label: 'Ditutup' },
}

function Badge({ style: s, children }) {
  return (
    <span style={{
      fontSize: 11.5, fontWeight: 600, padding: '4px 12px', borderRadius: 999,
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.color, border: `0.5px solid ${s.border}`,
    }}>
      {children}
    </span>
  )
}

function NewsCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const tagColor = TAG_COLORS[item.tag]
  const statusColor = STATUS_COLORS[item.status]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `0.5px solid ${hovered ? 'rgba(0,0,0,0.18)' : 'var(--line)'}`,
        borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden',
        cursor: 'pointer', transition: 'all .15s',
        boxShadow: hovered ? '0 4px 18px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 148, background: 'var(--bg-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '0.5px solid var(--line)', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(226,75,74,0.06), rgba(226,75,74,0.01))',
        fontSize: 44,
      }}>
        {item.icon}
      </div>

      {/* Body */}
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
          <Badge style={tagColor}>{TAG_LABELS[item.tag]}</Badge>
          <Badge style={statusColor}>{statusColor.label}</Badge>
          <span style={{ fontSize: 12, color: 'var(--ink-mute)', display: 'flex', alignItems: 'center', gap: 4 }}>
            📅 {item.date}
          </span>
        </div>
        <div style={{
          fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 7, lineHeight: 1.45,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.title}
        </div>
        <div style={{
          fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.65, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.excerpt}
        </div>
        <div style={{ marginTop: 14 }}>
          <span style={{
            fontSize: 13, fontWeight: 500, color: 'var(--red-600)',
            display: 'inline-flex', alignItems: 'center', gap: hovered ? 8 : 5, transition: 'gap .15s',
          }}>
            Baca selengkapnya →
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Pengumuman() {
  const [activeTag, setActiveTag] = useState('semua')
  const [query, setQuery] = useState('')
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    function calc() {
      const diff = new Date('2025-08-31T23:59:59') - new Date()
      if (diff <= 0) { setCountdown('Pendaftaran ditutup'); return }
      setCountdown(Math.floor(diff / 86400000) + ' hari lagi')
    }
    calc()
    const t = setInterval(calc, 60000)
    return () => clearInterval(t)
  }, [])

  const filtered = ANNOUNCEMENTS.filter(a => {
    const matchTag = activeTag === 'semua' || a.tag === activeTag
    const matchQ   = query === '' || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchTag && matchQ
  })

  const tags = [
    { key: 'semua',    label: 'Semua' },
    { key: 'cfp-riim', label: 'CFP RIIM' },
    { key: 'cfp-rp',   label: 'CFP Rumah Program' },
    { key: 'cfr',      label: 'Call for Reviewer' },
  ]

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      <div className="wrap" style={{ padding: '48px 40px 0' }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, marginBottom: 10 }}>Pengumuman</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, maxWidth: 620, marginBottom: 36 }}>
          Informasi terbaru seputar pembukaan, penutupan, dan hasil seleksi program Call for Proposals dan Call for Reviewers BRIN
        </p>

        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-mute)', fontSize: 16 }}>🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari pengumuman…"
              style={{
                width: '100%', border: '0.5px solid var(--line)', borderRadius: 999,
                padding: '10px 16px 10px 38px', fontSize: 14, color: 'var(--ink)',
                outline: 'none', fontFamily: 'inherit', transition: 'border-color .15s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--red-400)'}
              onBlur={e => e.target.style.borderColor = 'var(--line)'}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tags.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTag(t.key)}
                style={{
                  fontSize: 13, padding: '8px 16px', borderRadius: 999, fontFamily: 'inherit',
                  border: '0.5px solid var(--line)', cursor: 'pointer', transition: 'all .15s',
                  background: activeTag === t.key ? 'var(--red-400)' : '#fff',
                  color:      activeTag === t.key ? '#fff'           : 'var(--ink-soft)',
                  borderColor: activeTag === t.key ? 'var(--red-400)' : 'var(--line)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 80 }}>

        {/* Featured */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
            📌 Terbaru &amp; Disorot
          </div>
          <div style={{
            border: '0.5px solid var(--red-100)', borderRadius: 16,
            background: 'linear-gradient(120deg, var(--red-50) 0%, #fff 55%)',
            padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 24, alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <Badge style={TAG_COLORS['cfp-riim']}>CFP RIIM</Badge>
                <Badge style={{ bg: 'var(--red-400)', color: '#fff', border: 'none' }}>Baru</Badge>
                <Badge style={STATUS_COLORS['dibuka']}>✓ Dibuka</Badge>
              </div>
              <h2 style={{ fontSize: 21, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3 }}>
                Pembukaan Pendaftaran RIIM Kompetisi Gelombang II — 2025
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 580 }}>
                Direktorat Pendanaan Riset dan Inovasi BRIN membuka kembali pendaftaran skema RIIM Kompetisi Gelombang II tahun 2025. Skema ini terbuka bagi peneliti dan institusi yang telah memenuhi persyaratan administratif dan teknis.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}>
              <div style={{ background: '#fff', border: '0.5px solid var(--line)', borderRadius: 10, padding: '14px 18px', textAlign: 'center', minWidth: 130 }}>
                <div style={{ fontSize: 11, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>Batas Pendaftaran</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--red-600)' }}>31 Agu 2025</div>
                <div style={{ fontSize: 12, color: 'var(--red-400)', marginTop: 2 }}>{countdown}</div>
              </div>
              <button style={{ fontSize: 13, padding: '8px 18px', borderRadius: 999, background: 'var(--red-400)', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
                Baca selengkapnya →
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
          📰 Semua Pengumuman
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-mute)', fontSize: 14 }}>
            Tidak ada pengumuman yang cocok dengan pencarian Anda.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
            {filtered.map(item => <NewsCard key={item.id} item={item} />)}
          </div>
        )}

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 24 }}>
          {['‹', '1', '2', '3', '…', '8', '›'].map((p, i) => (
            <button key={i} style={{
              width: 36, height: 36, borderRadius: 8, border: '0.5px solid var(--line)',
              background: p === '1' ? 'var(--red-400)' : '#fff',
              color:      p === '1' ? '#fff'           : 'var(--ink-soft)',
              borderColor: p === '1' ? 'var(--red-400)' : 'var(--line)',
              fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <footer style={{ background: '#0c0a0a', padding: '36px 0', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12.5 }}>
          © 2025 Direktorat Pendanaan Riset dan Inovasi — BRIN. Hak cipta dilindungi.
        </p>
      </footer>
    </div>
  )
}
