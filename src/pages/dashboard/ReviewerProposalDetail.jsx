import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  REVIEWER_ASSIGNMENTS, STATUS_REVIEWER,
  REKOMENDASI_OPTIONS, formatRp, daysLeft,
} from '../../data/reviewerData'

const SCORE_LABELS = [
  { min: 0,  max: 49,  label: 'Sangat Kurang', color: '#dc2626', bg: '#fee2e2' },
  { min: 50, max: 64,  label: 'Kurang',         color: '#ea580c', bg: '#ffedd5' },
  { min: 65, max: 74,  label: 'Cukup',          color: '#d97706', bg: '#fef3c7' },
  { min: 75, max: 84,  label: 'Baik',           color: '#16a34a', bg: '#dcfce7' },
  { min: 85, max: 100, label: 'Sangat Baik',    color: '#0369a1', bg: '#e0f2fe' },
]

function getScoreLabel(score) {
  return SCORE_LABELS.find(s => score >= s.min && score <= s.max) || SCORE_LABELS[0]
}

function ScoreSlider({ value, onChange, disabled }) {
  const label = getScoreLabel(value)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <input
          type="range" min={0} max={100} step={1}
          value={value} onChange={e => onChange(Number(e.target.value))}
          disabled={disabled}
          style={{ flex: 1, accentColor: label.color, cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 64 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: label.color, lineHeight: 1 }}>{value}</span>
          <span style={{ fontSize: 10, color: '#94a3b8' }}>/ 100</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, height: 5, background: '#f1f5f9', borderRadius: 999, flex: 1, overflow: 'hidden', marginRight: 12 }}>
          <div style={{ width: `${value}%`, height: '100%', background: label.color, borderRadius: 999, transition: 'width .2s' }} />
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: label.bg, color: label.color, whiteSpace: 'nowrap' }}>
          {label.label}
        </span>
      </div>
    </div>
  )
}

export default function ReviewerProposalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const assignment = REVIEWER_ASSIGNMENTS.find(a => a.id === id)
  if (!assignment) return (
    <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
      Penugasan tidak ditemukan.{' '}
      <span style={{ color: '#E24B4A', cursor: 'pointer' }} onClick={() => navigate('/reviewer')}>← Kembali</span>
    </div>
  )

  const isSubmitted = assignment.status === 'submitted'

  const [activeSection, setActiveSection] = useState(assignment.sections[0].key)
  const [scores, setScores] = useState(
    assignment.review?.scores
      ? Object.fromEntries(Object.entries(assignment.review.scores).map(([k, v]) => [k, v]))
      : {}
  )
  const [rekomendasi, setRekomendasi] = useState(assignment.review?.rekomendasi || '')
  const [catatanUmum, setCatatanUmum] = useState(assignment.review?.catatan_umum || '')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitted, setSubmitted] = useState(isSubmitted)
  const [activeTab, setActiveTab] = useState('proposal') // proposal | review

  function updateScore(key, field, value) {
    setScores(prev => ({ ...prev, [key]: { ...(prev[key] || { score: 70, catatan: '' }), [field]: value } }))
  }

  const activeSectionData = assignment.sections.find(s => s.key === activeSection)
  const filledCount = Object.keys(scores).length
  const totalSections = assignment.sections.length
  const avgScore = filledCount > 0
    ? Math.round(Object.values(scores).reduce((s, v) => s + (v.score ?? 70), 0) / filledCount)
    : 0
  const canSubmit = filledCount === totalSections && rekomendasi !== '' && !submitted

  const days = daysLeft(assignment.deadline)
  const sm   = STATUS_REVIEWER[submitted ? 'submitted' : assignment.status]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 24px', height: 54, display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
        <button onClick={() => navigate('/reviewer')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b', fontSize: 14, display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
          ← Kembali
        </button>
        <div style={{ width: 1, height: 20, background: '#e2e8f0' }} />
        <span style={{ fontSize: 13, color: '#94a3b8' }}>{assignment.id}</span>
        <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: sm.bg, color: sm.color, border: `0.5px solid ${sm.border}` }}>{sm.label}</span>
        {days >= 0 && !submitted && (
          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: days <= 3 ? '#fee2e2' : '#fef3c7', color: days <= 3 ? '#dc2626' : '#d97706' }}>
            {days <= 3 ? '⚡' : '📅'} {days} hari lagi
          </span>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {!submitted && (
            <button
              disabled={!canSubmit}
              onClick={() => setShowSubmitModal(true)}
              style={{
                fontSize: 13, padding: '8px 18px', borderRadius: 8, border: 'none',
                background: canSubmit ? '#16a34a' : '#e2e8f0',
                color: canSubmit ? '#fff' : '#94a3b8',
                cursor: canSubmit ? 'pointer' : 'not-allowed', fontFamily: 'inherit', fontWeight: 500,
              }}
            >
              {canSubmit ? '📤 Kirim Review' : `Isi ${totalSections - filledCount} seksi lagi`}
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>

        {/* Proposal header */}
        <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 10, lineHeight: 1.4 }}>{assignment.judul}</h1>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
            <span>📋 {assignment.skema}</span>
            <span>🏛 {assignment.institusi}</span>
            <span>👤 {assignment.ketua}</span>
            <span>💰 {formatRp(assignment.anggaran)}</span>
            <span>⏱ {assignment.durasi}</span>
          </div>
          {/* Abstract */}
          <div style={{ marginTop: 14, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, fontSize: 13.5, color: '#475569', lineHeight: 1.75, border: '0.5px solid #f1f5f9' }}>
            <strong style={{ color: '#1e293b' }}>Abstrak: </strong>{assignment.abstract}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[['proposal','📄 Baca Proposal'],['review','✏️ Form Penilaian']].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              fontSize: 13.5, padding: '9px 20px', borderRadius: 8, fontFamily: 'inherit',
              border: '0.5px solid', cursor: 'pointer', fontWeight: activeTab === key ? 600 : 400,
              background: activeTab === key ? '#1e293b' : '#fff',
              color: activeTab === key ? '#fff' : '#475569',
              borderColor: activeTab === key ? '#1e293b' : '#e2e8f0',
            }}>{label}</button>
          ))}
        </div>

        {activeTab === 'proposal' && (
          /* ===== READ PROPOSAL TAB ===== */
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
            {/* Section nav */}
            <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 14, height: 'fit-content', position: 'sticky', top: 70 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>Seksi</div>
              {assignment.sections.map(s => (
                <div key={s.key} onClick={() => setActiveSection(s.key)} style={{
                  padding: '8px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 13,
                  background: activeSection === s.key ? '#1e293b' : 'transparent',
                  color: activeSection === s.key ? '#fff' : '#475569',
                  marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all .15s',
                }}
                  onMouseEnter={e => { if (activeSection !== s.key) e.currentTarget.style.background = '#f8fafc' }}
                  onMouseLeave={e => { if (activeSection !== s.key) e.currentTarget.style.background = 'transparent' }}
                >
                  {s.label}
                  {scores[s.key] && <span style={{ fontSize: 11, fontWeight: 700, color: activeSection === s.key ? '#94a3b8' : getScoreLabel(scores[s.key].score).color }}>{scores[s.key].score}</span>}
                </div>
              ))}
            </div>

            {/* Content + quick score */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 14 }}>{activeSectionData?.label}</h2>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.85 }}>{activeSectionData?.content}</div>
              </div>

              {/* Quick score for this section */}
              <div style={{ background: '#fff', border: `0.5px solid ${scores[activeSection] ? '#e2e8f0' : 'rgba(29,78,216,0.2)'}`, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 14 }}>
                  Nilai seksi ini — <span style={{ color: '#475569', fontWeight: 400 }}>{activeSectionData?.label}</span>
                </div>
                <ScoreSlider
                  value={scores[activeSection]?.score ?? 70}
                  onChange={v => updateScore(activeSection, 'score', v)}
                  disabled={submitted}
                />
                <textarea
                  value={scores[activeSection]?.catatan || ''}
                  onChange={e => updateScore(activeSection, 'catatan', e.target.value)}
                  disabled={submitted}
                  placeholder="Catatan untuk seksi ini (opsional)…"
                  rows={2}
                  style={{ width: '100%', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#1e293b', outline: 'none', fontFamily: 'inherit', resize: 'none', marginTop: 12, background: submitted ? '#f8fafc' : '#fff' }}
                />
                {/* Next section button */}
                {assignment.sections.findIndex(s => s.key === activeSection) < assignment.sections.length - 1 && (
                  <button
                    onClick={() => {
                      const idx = assignment.sections.findIndex(s => s.key === activeSection)
                      setActiveSection(assignment.sections[idx + 1].key)
                    }}
                    style={{ marginTop: 12, fontSize: 13, padding: '8px 16px', borderRadius: 7, border: 'none', background: '#1d4ed8', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Seksi berikutnya →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          /* ===== REVIEW FORM TAB ===== */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Score per section */}
              {assignment.sections.map(section => {
                const sectionScore = scores[section.key]
                const label = sectionScore ? getScoreLabel(sectionScore.score) : null
                return (
                  <div key={section.key} style={{
                    background: '#fff', border: `0.5px solid ${sectionScore ? '#e2e8f0' : 'rgba(29,78,216,0.15)'}`,
                    borderRadius: 12, padding: 20,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 600, color: '#1e293b' }}>{section.label}</span>
                      {!sectionScore && !submitted && (
                        <span style={{ fontSize: 11, color: '#1d4ed8', background: '#dbeafe', padding: '2px 8px', borderRadius: 999 }}>Belum dinilai</span>
                      )}
                    </div>
                    <ScoreSlider
                      value={sectionScore?.score ?? 70}
                      onChange={v => updateScore(section.key, 'score', v)}
                      disabled={submitted}
                    />
                    <textarea
                      value={sectionScore?.catatan || ''}
                      onChange={e => updateScore(section.key, 'catatan', e.target.value)}
                      disabled={submitted}
                      placeholder={`Catatan untuk ${section.label.toLowerCase()}…`}
                      rows={2}
                      style={{ width: '100%', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#1e293b', outline: 'none', fontFamily: 'inherit', resize: 'none', marginTop: 12, background: submitted ? '#f8fafc' : '#fff' }}
                    />
                  </div>
                )
              })}

              {/* Recommendation + general note */}
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: '#1e293b', marginBottom: 14 }}>Rekomendasi Akhir</div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  {REKOMENDASI_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => !submitted && setRekomendasi(opt.value)} style={{
                      flex: 1, padding: '12px', borderRadius: 8, fontFamily: 'inherit',
                      border: `1.5px solid ${rekomendasi === opt.value ? opt.color : '#e2e8f0'}`,
                      background: rekomendasi === opt.value ? opt.bg : '#fff',
                      color: rekomendasi === opt.value ? opt.color : '#64748b',
                      cursor: submitted ? 'not-allowed' : 'pointer',
                      fontWeight: rekomendasi === opt.value ? 700 : 400, fontSize: 13.5,
                      transition: 'all .15s',
                    }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.icon}</div>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', marginBottom: 8 }}>Catatan Umum</div>
                <textarea
                  value={catatanUmum}
                  onChange={e => !submitted && setCatatanUmum(e.target.value)}
                  disabled={submitted}
                  placeholder="Ringkasan penilaian dan catatan keseluruhan untuk proposal ini…"
                  rows={4}
                  style={{ width: '100%', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', fontSize: 13.5, color: '#1e293b', outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6, background: submitted ? '#f8fafc' : '#fff' }}
                />
              </div>
            </div>

            {/* Right — summary panel */}
            <div style={{ position: 'sticky', top: 70, display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Score summary */}
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>Ringkasan Nilai</div>

                {/* Average circle */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
                  <svg width={100} height={100} viewBox="0 0 100 100">
                    <circle cx={50} cy={50} r={40} fill="none" stroke="#f1f5f9" strokeWidth={9} />
                    <circle
                      cx={50} cy={50} r={40} fill="none"
                      stroke={avgScore >= 80 ? '#16a34a' : avgScore >= 65 ? '#d97706' : '#dc2626'}
                      strokeWidth={9}
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - avgScore / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'all .4s ease' }}
                    />
                    <text x={50} y={46} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1e293b">{avgScore}</text>
                    <text x={50} y={62} textAnchor="middle" fontSize={10} fill="#94a3b8">rata-rata</text>
                  </svg>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{filledCount}/{totalSections} seksi dinilai</div>
                </div>

                {/* Per-section mini summary */}
                {assignment.sections.map(s => {
                  const sc = scores[s.key]
                  const lbl = sc ? getScoreLabel(sc.score) : null
                  return (
                    <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, cursor: 'pointer' }} onClick={() => setActiveTab('review')}>
                      <span style={{ fontSize: 11.5, color: '#475569', flex: 1, lineHeight: 1.3 }}>{s.label}</span>
                      {sc ? (
                        <span style={{ fontSize: 12, fontWeight: 700, color: lbl.color, minWidth: 28, textAlign: 'right' }}>{sc.score}</span>
                      ) : (
                        <span style={{ fontSize: 10, color: '#94a3b8' }}>—</span>
                      )}
                    </div>
                  )
                })}

                {rekomendasi && (
                  <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 8, background: REKOMENDASI_OPTIONS.find(o => o.value === rekomendasi)?.bg, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: REKOMENDASI_OPTIONS.find(o => o.value === rekomendasi)?.color }}>
                      Rekomendasi: {REKOMENDASI_OPTIONS.find(o => o.value === rekomendasi)?.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Submit button */}
              {!submitted && (
                <button
                  disabled={!canSubmit}
                  onClick={() => setShowSubmitModal(true)}
                  style={{
                    width: '100%', padding: '13px', borderRadius: 10, border: 'none',
                    background: canSubmit ? '#16a34a' : '#e2e8f0',
                    color: canSubmit ? '#fff' : '#94a3b8',
                    fontSize: 14, fontWeight: 600, cursor: canSubmit ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit', transition: 'all .2s',
                  }}
                >
                  {canSubmit ? '📤 Kirim Review' : filledCount < totalSections ? `Isi ${totalSections - filledCount} seksi lagi` : 'Pilih rekomendasi'}
                </button>
              )}

              {submitted && (
                <div style={{ background: '#dcfce7', border: '0.5px solid rgba(22,163,74,0.3)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>✓</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#16a34a' }}>Review telah dikirim</div>
                  <div style={{ fontSize: 12, color: '#166534', marginTop: 4 }}>{assignment.review?.submitted_at}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Submit confirmation modal */}
      {showSubmitModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Kirim Review?</h2>
            <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>
              Anda akan mengirimkan penilaian untuk <strong>{assignment.judul.substring(0, 60)}…</strong>
              <br />Rekomendasi: <strong style={{ color: REKOMENDASI_OPTIONS.find(o => o.value === rekomendasi)?.color }}>
                {REKOMENDASI_OPTIONS.find(o => o.value === rekomendasi)?.label}
              </strong>
              <br />Rata-rata skor: <strong>{avgScore} / 100</strong>
            </p>
            <div style={{ background: '#fef3c7', border: '0.5px solid rgba(217,119,6,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 12.5, color: '#92400e', marginBottom: 20 }}>
              ⚠ Review yang sudah dikirim tidak dapat diubah. Pastikan semua penilaian sudah benar.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowSubmitModal(false)} style={{ flex: 1, padding: 10, borderRadius: 8, border: '0.5px solid #e2e8f0', background: '#fff', color: '#475569', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5 }}>Batal</button>
              <button onClick={() => { setSubmitted(true); setShowSubmitModal(false) }} style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600 }}>
                Ya, Kirim Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
