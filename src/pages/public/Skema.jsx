import { useState } from 'react'

const SCHEMES = [
  {
    id: 1, tag: 'cfp-riim', status: 'dibuka', name: 'Pusat Kolaborasi Riset', sub: 'Pusat Kolaborasi Riset (Sepanjang Tahun)',
    def: 'Pendanaan yang diberikan kepada institusi/Lembaga dalam mengembangkan pusat kolaborasi riset dan inovasi pada bidang spesifik secara multi dan interdisiplin sesuai standar yang bersifat nasional dan dapat bereputasi internasional sesuai perkembangan ilmu pengetahuan dan teknologi.',
    topics: ['Air & Lingkungan Hidup','Tenaga Nuklir','Dirgantara & Antariksa','Sosial Masyarakat','Pangan','Energi','Kesehatan','Industri Strategis'],
    outputs: ['Minimal 1 Karya Tulis Ilmiah pada jurnal yang bereputasi serendah-rendahnya Q3 atau setara, dan/atau','KI berupa paten dan atau paten sederhana atau Perlindungan Varietas Tanaman (PVT) dengan status minimal terdaftar'],
    duration: '1, 2, 3 Periode', notes: ['*Maksimal 3 Periode','** 1 Periode = 12 Bulan'],
  },
  {
    id: 2, tag: 'cfp-riim', status: 'segera', name: 'RIIM Kompetisi', sub: 'Pusat Kolaborasi Riset (Sepanjang Tahun)',
    def: 'Pendanaan yang diberikan kepada institusi/Lembaga dalam mengembangkan pusat kolaborasi riset dan inovasi pada bidang spesifik secara multi dan interdisiplin sesuai standar yang bersifat nasional dan dapat bereputasi internasional.',
    topics: ['Air & Lingkungan Hidup','Tenaga Nuklir','Dirgantara & Antariksa','Sosial Masyarakat','Pangan','Energi','Kesehatan','Industri Strategis'],
    outputs: ['Minimal 1 Karya Tulis Ilmiah pada jurnal yang bereputasi serendah-rendahnya Q3 atau setara, dan/atau','KI berupa paten dan atau paten sederhana atau Perlindungan Varietas Tanaman (PVT) dengan status minimal terdaftar'],
    duration: '1, 2, 3 Periode', notes: ['*Maksimal 3 Periode','** 1 Periode = 12 Bulan'],
  },
  {
    id: 3, tag: 'cfp-rp', status: 'dibuka', name: 'CFP Rumah Program — Energi', sub: 'Rumah Program Bidang Energi Terbarukan',
    def: 'CFP Rumah Program memfasilitasi pengajuan pendanaan yang dikelola oleh organisasi riset BRIN pada bidang energi baru dan terbarukan untuk mendukung transisi energi nasional.',
    topics: ['Energi','Industri Strategis','Sosial Masyarakat'],
    outputs: ['Prototype teknologi energi terbarukan skala laboratorium','Publikasi ilmiah pada jurnal bereputasi Q2 atau setara'],
    duration: '1, 2 Periode', notes: ['*Maksimal 2 Periode','** 1 Periode = 12 Bulan'],
  },
  {
    id: 4, tag: 'cfr', status: 'segera', name: 'Call for Reviewer Gelombang III', sub: 'Reviewer Proposal Riset Nasional 2025',
    def: 'Program rekrutmen reviewer untuk mengevaluasi proposal riset yang masuk pada program RIIM Kompetisi dan CFP Rumah Program. Reviewer harus memenuhi persyaratan kompetensi sesuai bidang riset yang ditangani.',
    topics: ['Air & Lingkungan Hidup','Pangan','Kesehatan','Energi','Industri Strategis'],
    outputs: ['Laporan evaluasi proposal sesuai panduan reviewer','Nilai dan rekomendasi untuk setiap proposal yang ditangani'],
    duration: '1 Periode', notes: ['** 1 Periode = 6 Bulan'],
  },
]

const STATUS_STYLES = {
  dibuka:  { bg: 'var(--green-50)', color: 'var(--green-800)', border: 'rgba(59,109,17,0.2)',  label: 'Dibuka' },
  segera:  { bg: 'var(--amber-50)', color: 'var(--amber-700)', border: 'rgba(133,79,11,0.2)', label: 'Segera' },
  ditutup: { bg: '#F1EFE8',         color: '#444441',           border: 'rgba(0,0,0,0.08)',    label: 'Ditutup' },
}

const TAG_LABELS = { 'cfp-riim': 'CFP RIIM', 'cfp-rp': 'CFP Rumah Program', 'cfr': 'Call for Reviewer' }

const ALL_TOPICS = ['Air & Lingkungan Hidup','Tenaga Nuklir','Dirgantara & Antariksa','Sosial Masyarakat','Pangan','Energi','Kesehatan','Industri Strategis']

function FilterDropdown({ label, open, onToggle, children }) {
  return (
    <div style={{ marginBottom: 10, position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', background: 'var(--red-400)', color: '#fff',
          border: 'none', borderRadius: 999, padding: '13px 18px',
          fontSize: 14.5, fontWeight: 500, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer', fontFamily: 'inherit',
          transition: 'background .15s',
        }}
      >
        {label}
        <span style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
      </button>
      {open && (
        <div style={{
          background: '#fff', border: '0.5px solid var(--line)',
          borderRadius: 10, marginTop: 6, padding: 6,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

function FilterOption({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px',
      borderRadius: 8, cursor: 'pointer', fontSize: 13.5,
      transition: 'background .15s',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--red-50)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor: 'var(--red-400)', width: 14, height: 14 }} />
      {label}
    </label>
  )
}

function SchemeCard({ scheme }) {
  const [hovered, setHovered] = useState(false)
  const statusStyle = STATUS_STYLES[scheme.status]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `0.5px solid ${hovered ? 'rgba(0,0,0,0.18)' : 'var(--line)'}`,
        borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column',
        transition: 'all .15s',
        boxShadow: hovered ? '0 4px 18px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Top */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ border: '0.5px solid var(--red-400)', color: 'var(--red-600)', fontSize: 12.5, fontWeight: 600, padding: '5px 14px', borderRadius: 999 }}>
          {TAG_LABELS[scheme.tag]}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, padding: '5px 13px', borderRadius: 999, background: statusStyle.bg, color: statusStyle.color, border: `0.5px solid ${statusStyle.border}` }}>
          {statusStyle.label}
        </span>
      </div>

      <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--red-600)', marginBottom: 3 }}>{scheme.name}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 16 }}>{scheme.sub}</div>

      {/* Definition */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, marginBottom: 7, color: 'var(--ink)' }}>
          🔍 Definisi
        </div>
        <p style={{
          fontSize: 12.8, color: 'var(--ink-soft)', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {scheme.def}
        </p>
      </div>

      {/* Topics */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, marginBottom: 7, color: 'var(--ink)' }}>
          📁 Topik
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {scheme.topics.map(t => (
            <span key={t} style={{ border: '0.5px solid var(--line)', borderRadius: 999, padding: '6px 12px', fontSize: 12, color: 'var(--ink)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Output */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, marginBottom: 7, color: 'var(--ink)' }}>
          📤 Output
        </div>
        <ol style={{ paddingLeft: 18, fontSize: 12.8, color: 'var(--ink-soft)', lineHeight: 1.65 }}>
          {scheme.outputs.map((o, i) => <li key={i} style={{ marginBottom: 2 }}>{o}</li>)}
        </ol>
      </div>

      {/* Duration */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 600, marginBottom: 4, color: 'var(--ink)' }}>
          🕐 Durasi
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{scheme.duration}</div>
        {scheme.notes.map((n, i) => (
          <div key={i} style={{ fontSize: 11.5, color: 'var(--red-600)', marginTop: 2 }}>{n}</div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          border: `0.5px solid ${hovered ? 'transparent' : 'var(--red-400)'}`,
          color: hovered ? '#fff' : 'var(--red-600)',
          background: hovered ? 'var(--red-400)' : 'transparent',
          borderRadius: 999, padding: '9px 18px', fontSize: 13.5, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
        }}>
          Lihat detail →
        </button>
      </div>
    </div>
  )
}

export default function Skema() {
  const [openDD, setOpenDD] = useState(null)
  const [layanan, setLayanan] = useState({ 'cfp-riim': true, 'cfp-rp': true, 'cfr': false })
  const [statuses, setStatuses] = useState({ dibuka: true, segera: true, ditutup: false })
  const [topics, setTopics] = useState({})

  function toggleDD(key) { setOpenDD(prev => prev === key ? null : key) }
  function toggleLayanan(k) { setLayanan(prev => ({ ...prev, [k]: !prev[k] })) }
  function toggleStatus(k)  { setStatuses(prev => ({ ...prev, [k]: !prev[k] })) }
  function toggleTopic(k)   { setTopics(prev => ({ ...prev, [k]: !prev[k] })) }

  function reset() {
    setLayanan({ 'cfp-riim': false, 'cfp-rp': false, 'cfr': false })
    setStatuses({ dibuka: false, segera: false, ditutup: false })
    setTopics({})
  }

  const anyLayanan  = Object.values(layanan).some(Boolean)
  const anyStatus   = Object.values(statuses).some(Boolean)
  const anyTopic    = Object.values(topics).some(Boolean)

  const filtered = SCHEMES.filter(s => {
    const matchLayanan = !anyLayanan || layanan[s.tag]
    const matchStatus  = !anyStatus  || statuses[s.status]
    const matchTopic   = !anyTopic   || s.topics.some(t => topics[t])
    return matchLayanan && matchStatus && matchTopic
  })

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="wrap" style={{ padding: '48px 40px 80px' }}>

        <h1 style={{ fontSize: 34, fontWeight: 700, marginBottom: 10 }}>Skema Pendanaan</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginBottom: 36 }}>
          Pada bagian ini Anda dapat mengetahui detail skema yang terdapat pada masing-masing layanan
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 36, alignItems: 'start' }}>

          {/* Sidebar */}
          <aside onClick={() => setOpenDD(null)}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ fontSize: 19, fontWeight: 700 }}>Filter skema</span>
              <span onClick={reset} style={{ fontSize: 13, color: 'var(--red-400)', cursor: 'pointer', fontWeight: 500 }}>Reset</span>
            </div>

            <div onClick={e => e.stopPropagation()}>
              <FilterDropdown label="Layanan" open={openDD === 'layanan'} onToggle={() => toggleDD('layanan')}>
                {[['cfp-riim','CFP RIIM'],['cfp-rp','CFP Rumah Program'],['cfr','Call for Reviewer']].map(([k,l]) => (
                  <FilterOption key={k} label={l} checked={!!layanan[k]} onChange={() => toggleLayanan(k)} />
                ))}
              </FilterDropdown>

              <FilterDropdown label="Status" open={openDD === 'status'} onToggle={() => toggleDD('status')}>
                {[['dibuka','Dibuka'],['segera','Segera'],['ditutup','Ditutup']].map(([k,l]) => (
                  <FilterOption key={k} label={l} checked={!!statuses[k]} onChange={() => toggleStatus(k)} />
                ))}
              </FilterDropdown>

              <FilterDropdown label="Topik Riset" open={openDD === 'topik'} onToggle={() => toggleDD('topik')}>
                {ALL_TOPICS.map(t => (
                  <FilterOption key={t} label={t} checked={!!topics[t]} onChange={() => toggleTopic(t)} />
                ))}
              </FilterDropdown>
            </div>

            {/* Active chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
              {Object.entries(statuses).filter(([,v]) => v).map(([k]) => (
                <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--red-50)', color: 'var(--red-800)', borderRadius: 999, padding: '5px 10px 5px 12px', fontSize: 12, fontWeight: 500 }}>
                  {STATUS_STYLES[k].label}
                  <span onClick={() => toggleStatus(k)} style={{ cursor: 'pointer', fontSize: 13, color: 'var(--red-400)' }}>✕</span>
                </span>
              ))}
            </div>
          </aside>

          {/* Cards */}
          <main>
            <div style={{ fontSize: 13.5, color: 'var(--ink-mute)', marginBottom: 16 }}>
              Menampilkan {filtered.length} dari {SCHEMES.length} skema
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-mute)', fontSize: 14 }}>
                Tidak ada skema yang cocok dengan filter Anda.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {filtered.map(s => <SchemeCard key={s.id} scheme={s} />)}
              </div>
            )}
          </main>

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
