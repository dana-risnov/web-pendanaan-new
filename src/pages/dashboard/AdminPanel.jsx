import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PROPOSALS, formatRp, STATUS_META, REC_META } from '../../data/proposals'
import AIScorePanel from '../../components/AIScorePanel'

const SIDEBAR_ITEMS = [
  { icon: '📊', label: 'Dashboard',        key: 'dashboard' },
  { icon: '📄', label: 'Daftar Proposal',  key: 'proposals', active: true },
  { icon: '📢', label: 'Pengumuman',       key: 'pengumuman' },
  { icon: '👥', label: 'Manajemen User',   key: 'users' },
  { icon: '📋', label: 'Kelola Skema',     key: 'skema' },
  { icon: '📈', label: 'Laporan',          key: 'laporan' },
  { icon: '⚙️', label: 'Pengaturan',       key: 'settings' },
]

export default function AdminPanel() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('proposals')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSkema, setFilterSkema]   = useState('all')
  const [filterRec, setFilterRec]       = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [selectedId, setSelectedId] = useState(null)

  if (!user || user.role !== 'admin') { navigate('/login'); return null }

  const stats = [
    { label: 'Total Proposal',    value: PROPOSALS.length,                                                  color: '#1e293b', sub: 'Semua status' },
    { label: 'Menunggu Review',   value: PROPOSALS.filter(p => p.status === 'pending').length,              color: '#d97706', sub: 'Perlu tindakan' },
    { label: 'Disetujui',         value: PROPOSALS.filter(p => p.status === 'approved').length,             color: '#16a34a', sub: 'Tahun 2025' },
    { label: 'Rata-rata AI Score',value: Math.round(PROPOSALS.reduce((s, p) => s + p.ai.total, 0) / PROPOSALS.length), color: '#7c3aed', sub: 'Dari 100 poin' },
  ]

  const filtered = PROPOSALS
    .filter(p => {
      const q = search.toLowerCase()
      const matchQ      = !q || p.judul.toLowerCase().includes(q) || p.ketua.toLowerCase().includes(q) || p.institusi.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      const matchStatus = filterStatus === 'all' || p.status === filterStatus
      const matchSkema  = filterSkema  === 'all' || p.skema === filterSkema
      const matchRec    = filterRec    === 'all' || p.ai.recommendation === filterRec
      return matchQ && matchStatus && matchSkema && matchRec
    })
    .sort((a, b) => {
      if (sortBy === 'score-desc') return b.ai.total - a.ai.total
      if (sortBy === 'score-asc')  return a.ai.total - b.ai.total
      if (sortBy === 'budget')     return b.anggaran - a.anggaran
      return 0
    })

  const selectedProposal = PROPOSALS.find(p => p.id === selectedId)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#0f172a', flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div onClick={() => navigate('/')} style={{ padding: '20px 16px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: '#E24B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13 }}>✦</div>
          <div>
            <div style={{ color: '#E24B4A', fontSize: 11, fontWeight: 600 }}>Pendanaan</div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Riset & Inovasi</div>
          </div>
        </div>

        <div style={{ padding: '14px 10px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '.07em', padding: '0 6px', marginBottom: 8 }}>Admin Panel</div>
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.key} onClick={() => setActiveNav(item.key)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
              borderRadius: 8, cursor: 'pointer', marginBottom: 2,
              background: activeNav === item.key ? 'rgba(226,75,74,0.15)' : 'transparent',
              borderLeft: `2px solid ${activeNav === item.key ? '#E24B4A' : 'transparent'}`,
              color: activeNav === item.key ? '#f1f5f9' : '#64748b', fontSize: 13,
              transition: 'all .15s',
            }}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </div>

        <div style={{ padding: 14, borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#E24B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>{user.name.charAt(0)}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#e2e8f0' }}>{user.name}</div>
              <div style={{ fontSize: 10, color: '#475569' }}>Administrator</div>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/') }} style={{ width: '100%', fontSize: 12, padding: '7px', borderRadius: 7, background: 'transparent', border: '0.5px solid rgba(255,255,255,0.1)', color: '#64748b', cursor: 'pointer', fontFamily: 'inherit' }}>
            Keluar
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Daftar Proposal</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ fontSize: 12.5, padding: '7px 14px', borderRadius: 7, border: '0.5px solid #e2e8f0', background: '#fff', color: '#475569', cursor: 'pointer', fontFamily: 'inherit' }}>📥 Export</button>
            <button onClick={() => navigate('/dashboard/apply')} style={{ fontSize: 12.5, padding: '7px 14px', borderRadius: 7, border: 'none', background: '#E24B4A', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>+ Tambah Manual</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 10, padding: '14px 16px', marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 15 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari proposal, ketua, institusi…"
                style={{ width: '100%', border: '0.5px solid #e2e8f0', borderRadius: 7, padding: '8px 12px 8px 34px', fontSize: 13, color: '#1e293b', outline: 'none', fontFamily: 'inherit' }} />
            </div>
            {[
              { label: 'Status', value: filterStatus, onChange: setFilterStatus, options: [['all','Semua Status'],['pending','Menunggu'],['approved','Disetujui'],['rejected','Ditolak'],['revision','Revisi']] },
              { label: 'Rekomendasi AI', value: filterRec, onChange: setFilterRec, options: [['all','Semua Rekomendasi'],['accept','Terima'],['revise','Revisi'],['reject','Tolak']] },
              { label: 'Urutkan', value: sortBy, onChange: setSortBy, options: [['date','Terbaru'],['score-desc','Skor Tertinggi'],['score-asc','Skor Terendah'],['budget','Anggaran Terbesar']] },
            ].map(f => (
              <select key={f.label} value={f.value} onChange={e => f.onChange(e.target.value)}
                style={{ border: '0.5px solid #e2e8f0', borderRadius: 7, padding: '8px 12px', fontSize: 13, color: '#1e293b', outline: 'none', fontFamily: 'inherit', background: '#fff', cursor: 'pointer' }}>
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ))}
            <div style={{ fontSize: 12.5, color: '#94a3b8', marginLeft: 'auto' }}>{filtered.length} proposal</div>
          </div>

          {/* List + detail panel */}
          <div style={{ display: 'grid', gridTemplateColumns: selectedId ? '1fr 380px' : '1fr', gap: 16, alignItems: 'start' }}>

            {/* Proposal list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.map(p => {
                const sm  = STATUS_META[p.status]
                const rec = REC_META[p.ai.recommendation]
                const isSelected = selectedId === p.id
                return (
                  <div key={p.id}
                    onClick={() => setSelectedId(isSelected ? null : p.id)}
                    style={{
                      background: '#fff', border: `0.5px solid ${isSelected ? '#E24B4A' : '#e2e8f0'}`,
                      borderRadius: 10, padding: '16px 18px', cursor: 'pointer',
                      transition: 'all .15s', boxShadow: isSelected ? '0 0 0 2px rgba(226,75,74,0.1)' : 'none',
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = '#cbd5e1' }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      {/* AI score circle */}
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                        border: `2px solid ${p.ai.total >= 80 ? '#16a34a' : p.ai.total >= 65 ? '#d97706' : '#dc2626'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: p.ai.total >= 80 ? '#16a34a' : p.ai.total >= 65 ? '#d97706' : '#dc2626', lineHeight: 1 }}>{p.ai.total}</span>
                        <span style={{ fontSize: 9, color: '#94a3b8', lineHeight: 1 }}>/ 100</span>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, color: '#94a3b8' }}>{p.id}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: sm.bg, color: sm.color }}>{sm.label}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: rec.bg, color: rec.color }}>AI: {rec.label}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 4, lineHeight: 1.4,
                          overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {p.judul}
                        </div>
                        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748b', flexWrap: 'wrap' }}>
                          <span>👤 {p.ketua}</span>
                          <span>🏛 {p.institusi}</span>
                          <span>💰 {formatRp(p.anggaran)}</span>
                          <span>📅 {p.submitted}</span>
                        </div>
                      </div>

                      <button onClick={e => { e.stopPropagation(); navigate(`/admin/proposal/${p.id}`) }}
                        style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, border: '0.5px solid #e2e8f0', background: '#fff', color: '#475569', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
                        Detail →
                      </button>
                    </div>
                  </div>
                )
              })}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8', fontSize: 14 }}>
                  Tidak ada proposal yang cocok dengan filter.
                </div>
              )}
            </div>

            {/* Quick detail panel */}
            {selectedProposal && (
              <div style={{ position: 'sticky', top: 24 }}>
                <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '0.5px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{selectedProposal.id}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => navigate(`/admin/proposal/${selectedProposal.id}`)} style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, border: '0.5px solid #E24B4A', background: '#fff', color: '#E24B4A', cursor: 'pointer', fontFamily: 'inherit' }}>Buka Penuh</button>
                      <button onClick={() => setSelectedId(null)} style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}>✕</button>
                    </div>
                  </div>
                  <div style={{ padding: 16, maxHeight: '70vh', overflowY: 'auto' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 12, lineHeight: 1.4 }}>{selectedProposal.judul}</p>
                    <AIScorePanel ai={selectedProposal.ai} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
