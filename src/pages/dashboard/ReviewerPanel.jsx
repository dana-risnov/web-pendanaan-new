import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  REVIEWER_ASSIGNMENTS, STATUS_REVIEWER,
  PRIORITY_META, formatRp, daysLeft,
} from '../../data/reviewerData'

const SIDEBAR_ITEMS = [
  { icon: '📋', label: 'Penugasan Saya',  key: 'assignments', active: true },
  { icon: '✅', label: 'Selesai Direview', key: 'done' },
  { icon: '🔔', label: 'Notifikasi',      key: 'notif' },
  { icon: '⚙️', label: 'Pengaturan',      key: 'settings' },
]

function StatCard({ label, value, color = '#1e293b', sub }) {
  return (
    <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 10, padding: '16px 18px' }}>
      <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#94a3b8' }}>{sub}</div>}
    </div>
  )
}

export default function ReviewerPanel() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('assignments')
  const [filter, setFilter] = useState('all')

  if (!user || user.role !== 'reviewer') { navigate('/login'); return null }

  const stats = [
    { label: 'Total Ditugaskan', value: REVIEWER_ASSIGNMENTS.length,                                        color: '#1e293b', sub: 'Periode ini' },
    { label: 'Perlu Diselesaikan',value: REVIEWER_ASSIGNMENTS.filter(a => a.status !== 'submitted').length,  color: '#d97706', sub: 'Segera tindak lanjuti' },
    { label: 'Selesai Direview',  value: REVIEWER_ASSIGNMENTS.filter(a => a.status === 'submitted').length,  color: '#16a34a', sub: 'Terima kasih!' },
    { label: 'Rata-rata Skor',
      value: (() => {
        const done = REVIEWER_ASSIGNMENTS.filter(a => a.review?.scores)
        if (!done.length) return '—'
        const avg = done.map(a => {
          const scores = Object.values(a.review.scores).map(s => s.score)
          return scores.reduce((s, v) => s + v, 0) / scores.length
        })
        return Math.round(avg.reduce((s, v) => s + v, 0) / avg.length)
      })(),
      color: '#7c3aed', sub: 'Dari 100 poin',
    },
  ]

  const filtered = REVIEWER_ASSIGNMENTS.filter(a =>
    filter === 'all' || a.status === filter
  )

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

        <div style={{ padding: '14px 10px', flex: 1 }}>
          <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '.07em', padding: '0 6px', marginBottom: 8 }}>Reviewer Panel</div>
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.key} onClick={() => setActiveNav(item.key)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
              borderRadius: 8, cursor: 'pointer', marginBottom: 2,
              background: activeNav === item.key ? 'rgba(226,75,74,0.15)' : 'transparent',
              borderLeft: `2px solid ${activeNav === item.key ? '#E24B4A' : 'transparent'}`,
              color: activeNav === item.key ? '#f1f5f9' : '#64748b',
              fontSize: 13, transition: 'all .15s',
            }}>
              <span>{item.icon}</span>{item.label}
              {item.key === 'assignments' && REVIEWER_ASSIGNMENTS.filter(a => a.status === 'pending').length > 0 && (
                <span style={{ marginLeft: 'auto', background: '#E24B4A', color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 700, padding: '1px 6px' }}>
                  {REVIEWER_ASSIGNMENTS.filter(a => a.status === 'pending').length}
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: 14, borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#E24B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>{user.name.charAt(0)}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#e2e8f0', lineHeight: 1.3 }}>{user.name}</div>
              <div style={{ fontSize: 10, color: '#475569' }}>Reviewer</div>
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
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Penugasan Review</div>
          <div style={{ fontSize: 12.5, color: '#64748b' }}>
            Selamat datang, <strong style={{ color: '#1e293b' }}>{user.name}</strong>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[['all','Semua'],['pending','Belum Dimulai'],['in_review','Sedang Review'],['submitted','Selesai']].map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{
                fontSize: 13, padding: '7px 16px', borderRadius: 999,
                border: '0.5px solid', fontFamily: 'inherit', cursor: 'pointer',
                background: filter === key ? '#1e293b' : '#fff',
                color: filter === key ? '#fff' : '#64748b',
                borderColor: filter === key ? '#1e293b' : '#e2e8f0',
                transition: 'all .15s',
              }}>
                {label}
                <span style={{ marginLeft: 6, fontSize: 11, opacity: .7 }}>
                  ({key === 'all' ? REVIEWER_ASSIGNMENTS.length : REVIEWER_ASSIGNMENTS.filter(a => a.status === key).length})
                </span>
              </button>
            ))}
          </div>

          {/* Assignment cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(assignment => {
              const sm   = STATUS_REVIEWER[assignment.status]
              const pm   = PRIORITY_META[assignment.priority]
              const days = daysLeft(assignment.deadline)
              const overdue = days < 0
              const urgent  = days >= 0 && days <= 3

              return (
                <div key={assignment.id} style={{
                  background: '#fff', border: `0.5px solid ${assignment.status === 'in_review' ? 'rgba(29,78,216,0.25)' : '#e2e8f0'}`,
                  borderRadius: 12, padding: '18px 20px',
                  boxShadow: assignment.status === 'in_review' ? '0 0 0 2px rgba(29,78,216,0.06)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>

                      {/* Badges */}
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{assignment.id}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: sm.bg, color: sm.color, border: `0.5px solid ${sm.border}` }}>{sm.label}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: pm.bg, color: pm.color }}>{pm.label}</span>
                        {(overdue || urgent) && (
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: '#fee2e2', color: '#dc2626' }}>
                            {overdue ? '⚠ Tenggat Terlewat' : `⚡ ${days} hari lagi`}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', marginBottom: 6, lineHeight: 1.45 }}>
                        {assignment.judul}
                      </h3>

                      {/* Meta */}
                      <div style={{ display: 'flex', gap: 20, fontSize: 12.5, color: '#64748b', flexWrap: 'wrap' }}>
                        <span>📋 {assignment.skema}</span>
                        <span>🏛 {assignment.institusi}</span>
                        <span>👤 {assignment.ketua}</span>
                        <span>💰 {formatRp(assignment.anggaran)}</span>
                        <span style={{ color: overdue ? '#dc2626' : urgent ? '#d97706' : '#64748b', fontWeight: overdue || urgent ? 600 : 400 }}>
                          📅 Deadline: {assignment.deadline}
                        </span>
                      </div>

                      {/* Progress bar if in_review */}
                      {assignment.status === 'in_review' && assignment.review?.scores && (
                        <div style={{ marginTop: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>
                            <span>Progress review</span>
                            <span>{Object.keys(assignment.review.scores).length} / {assignment.sections.length} seksi dinilai</span>
                          </div>
                          <div style={{ height: 5, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                            <div style={{
                              width: `${(Object.keys(assignment.review.scores).length / assignment.sections.length) * 100}%`,
                              height: '100%', background: '#1d4ed8', borderRadius: 999, transition: 'width .3s',
                            }} />
                          </div>
                        </div>
                      )}

                      {/* Submitted summary */}
                      {assignment.status === 'submitted' && assignment.review && (
                        <div style={{ marginTop: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
                          <span style={{ fontSize: 12.5, color: '#16a34a', fontWeight: 600 }}>✓ Review dikirim {assignment.review.submitted_at}</span>
                          <span style={{ fontSize: 12.5, color: '#64748b' }}>
                            Rekomendasi: <strong style={{ color: assignment.review.rekomendasi === 'terima' ? '#16a34a' : assignment.review.rekomendasi === 'tolak' ? '#dc2626' : '#7c3aed' }}>
                              {assignment.review.rekomendasi === 'terima' ? 'Terima' : assignment.review.rekomendasi === 'tolak' ? 'Tolak' : 'Perlu Revisi'}
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    <div style={{ flexShrink: 0 }}>
                      {assignment.status === 'submitted' ? (
                        <button
                          onClick={() => navigate(`/reviewer/proposal/${assignment.id}`)}
                          style={btnOutline}
                        >
                          Lihat Review
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate(`/reviewer/proposal/${assignment.id}`)}
                          style={assignment.status === 'in_review' ? btnPrimary : btnSecondary}
                        >
                          {assignment.status === 'in_review' ? 'Lanjutkan →' : 'Mulai Review →'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const btnPrimary   = { fontSize: 13, padding: '9px 18px', borderRadius: 8, border: 'none', background: '#1d4ed8', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, whiteSpace: 'nowrap' }
const btnSecondary = { fontSize: 13, padding: '9px 18px', borderRadius: 8, border: '0.5px solid #e2e8f0', background: '#fff', color: '#475569', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }
const btnOutline   = { fontSize: 13, padding: '9px 18px', borderRadius: 8, border: '0.5px solid #e2e8f0', background: '#f8fafc', color: '#475569', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }
