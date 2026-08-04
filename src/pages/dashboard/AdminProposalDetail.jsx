import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PROPOSALS, formatRp, STATUS_META, REC_META } from '../../data/proposals'
import AIScorePanel from '../../components/AIScorePanel'

const TABS = ['Ringkasan', 'Detail Proposal', 'Anggaran', 'Tim Pengusul', 'AI Scoring']

export default function AdminProposalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [proposals, setProposals] = useState(PROPOSALS)
  const [tab, setTab] = useState(0)
  const [note, setNote] = useState('')
  const [showConfirm, setShowConfirm] = useState(null) // 'approved' | 'rejected' | 'revision'

  const proposal = proposals.find(p => p.id === id)
  if (!proposal) return (
    <div style={{ padding: 60, textAlign: 'center', color: '#64748b' }}>
      Proposal tidak ditemukan. <span style={{ color: '#E24B4A', cursor: 'pointer' }} onClick={() => navigate(-1)}>← Kembali</span>
    </div>
  )

  const status = STATUS_META[proposal.status]
  const rec    = REC_META[proposal.ai.recommendation]

  function applyDecision(newStatus) {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p))
    setShowConfirm(null)
    setNote('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 28px', height: 54, display: 'flex', alignItems: 'center', gap: 14, position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={() => navigate('/admin')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b', fontSize: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
          ← Kembali
        </button>
        <div style={{ width: 1, height: 20, background: '#e2e8f0' }} />
        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b', flex: 1 }}>{proposal.id}</span>
        <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 999, background: status.bg, color: status.color, border: `0.5px solid ${status.border}` }}>
          {status.label}
        </span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

          {/* Left — main content */}
          <div>
            {/* Proposal header */}
            <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: '#f1f5f9', color: '#475569' }}>{proposal.skema}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: '#f1f5f9', color: '#475569' }}>{proposal.topik}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: '#f1f5f9', color: '#475569' }}>{proposal.durasi}</span>
                  </div>
                  <h1 style={{ fontSize: 19, fontWeight: 700, color: '#1e293b', lineHeight: 1.4, marginBottom: 10 }}>{proposal.judul}</h1>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      ['Ketua Peneliti', proposal.ketua],
                      ['Institusi', proposal.institusi],
                      ['Email', proposal.email],
                      ['Provinsi', proposal.provinsi],
                      ['Anggaran', formatRp(proposal.anggaran)],
                      ['Dikirim', proposal.submitted],
                    ].map(([l, v]) => (
                      <div key={l} style={{ fontSize: 13 }}>
                        <span style={{ color: '#94a3b8' }}>{l}: </span>
                        <span style={{ color: '#1e293b', fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '0.5px solid #e2e8f0', padding: '0 20px' }}>
                {TABS.map((t, i) => (
                  <button key={t} onClick={() => setTab(i)} style={{
                    padding: '12px 16px', border: 'none', background: 'transparent',
                    fontSize: 13.5, fontWeight: tab === i ? 600 : 400,
                    color: tab === i ? '#1e293b' : '#64748b',
                    borderBottom: `2px solid ${tab === i ? '#E24B4A' : 'transparent'}`,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                  }}>
                    {t === 'AI Scoring' ? '🤖 ' : ''}{t}
                  </button>
                ))}
              </div>

              <div style={{ padding: 24 }}>
                {tab === 0 && <TabRingkasan proposal={proposal} />}
                {tab === 1 && <TabDetail proposal={proposal} />}
                {tab === 2 && <TabAnggaran proposal={proposal} />}
                {tab === 3 && <TabPengusul proposal={proposal} />}
                {tab === 4 && <AIScorePanel ai={proposal.ai} />}
              </div>
            </div>
          </div>

          {/* Right — action panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* AI Score compact */}
            <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>AI Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 42, fontWeight: 700, color: proposal.ai.total >= 80 ? '#16a34a' : proposal.ai.total >= 65 ? '#d97706' : '#dc2626', lineHeight: 1 }}>
                  {proposal.ai.total}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>dari 100 poin</div>
                  <div style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: rec.bg, color: rec.color, display: 'inline-block' }}>
                    Rekomendasi: {rec.label}
                  </div>
                </div>
              </div>
              {/* Mini bars */}
              {proposal.ai.breakdown.map(item => (
                <div key={item.section} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#475569', marginBottom: 3 }}>
                    <span>{item.section}</span><span style={{ fontWeight: 600 }}>{item.score}</span>
                  </div>
                  <div style={{ height: 4, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${item.score}%`, height: '100%', borderRadius: 999, background: item.score >= 80 ? '#16a34a' : item.score >= 65 ? '#d97706' : '#dc2626' }} />
                  </div>
                </div>
              ))}
              <button onClick={() => setTab(4)} style={{ width: '100%', marginTop: 10, fontSize: 12, padding: '7px', borderRadius: 7, border: '0.5px solid #e2e8f0', background: '#f8fafc', color: '#475569', cursor: 'pointer', fontFamily: 'inherit' }}>
                Lihat analisis lengkap →
              </button>
            </div>

            {/* Decision panel */}
            {proposal.status === 'pending' && (
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>Keputusan Admin</div>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Catatan keputusan (opsional)…"
                  rows={3}
                  style={{ width: '100%', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#1e293b', outline: 'none', fontFamily: 'inherit', resize: 'none', marginBottom: 12 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button onClick={() => setShowConfirm('approved')} style={decBtn('#16a34a', '#dcfce7')}>✓ Setujui Proposal</button>
                  <button onClick={() => setShowConfirm('revision')} style={decBtn('#7c3aed', '#ede9fe')}>↻ Minta Revisi</button>
                  <button onClick={() => setShowConfirm('rejected')} style={decBtn('#dc2626', '#fee2e2')}>✕ Tolak Proposal</button>
                </div>
              </div>
            )}

            {proposal.status !== 'pending' && (
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>Keputusan</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: status.color, marginBottom: 6 }}>{status.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>Keputusan telah ditetapkan</div>
                <button onClick={() => applyDecision('pending')} style={{ marginTop: 12, width: '100%', fontSize: 12, padding: '7px', borderRadius: 7, border: '0.5px solid #e2e8f0', background: '#f8fafc', color: '#475569', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Batalkan Keputusan
                </button>
              </div>
            )}

            {/* Reviewer assignment */}
            <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>Reviewer Ditugaskan</div>
              {['Dr. Siti Rahma', 'Prof. Ahmad Yani'].map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#475569' }}>{r.charAt(0)}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{r}</div>
                    <div style={{ fontSize: 11, color: i === 0 ? '#16a34a' : '#d97706' }}>{i === 0 ? '✓ Selesai review' : '○ Belum review'}</div>
                  </div>
                </div>
              ))}
              <button style={{ width: '100%', marginTop: 4, fontSize: 12, padding: '7px', borderRadius: 7, border: '0.5px dashed #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontFamily: 'inherit' }}>
                + Tambah Reviewer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 28, maxWidth: 400, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
              {showConfirm === 'approved' ? '✓ Setujui Proposal?' : showConfirm === 'revision' ? '↻ Minta Revisi?' : '✕ Tolak Proposal?'}
            </h2>
            <p style={{ fontSize: 13.5, color: '#64748b', marginBottom: 16, lineHeight: 1.6 }}>
              {showConfirm === 'approved'
                ? 'Proposal akan ditandai Disetujui dan pemohon akan mendapat notifikasi.'
                : showConfirm === 'revision'
                ? 'Pemohon akan diminta melakukan revisi sesuai catatan yang diberikan.'
                : 'Proposal akan ditolak dan pemohon akan mendapat notifikasi penolakan.'}
            </p>
            {note && <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#475569', marginBottom: 16 }}>Catatan: {note}</div>}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowConfirm(null)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '0.5px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5 }}>Batal</button>
              <button
                onClick={() => applyDecision(showConfirm)}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600,
                  background: showConfirm === 'approved' ? '#16a34a' : showConfirm === 'revision' ? '#7c3aed' : '#dc2626',
                  color: '#fff',
                }}
              >
                Ya, {showConfirm === 'approved' ? 'Setujui' : showConfirm === 'revision' ? 'Minta Revisi' : 'Tolak'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const decBtn = (color, bg) => ({
  width: '100%', padding: '11px', borderRadius: 8, border: `0.5px solid ${color}20`,
  background: bg, color, fontSize: 13.5, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .15s',
})

function TabRingkasan({ proposal }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        ['ID Proposal', proposal.id],
        ['Judul', proposal.judul],
        ['Skema', proposal.skema],
        ['Topik Riset', proposal.topik],
        ['Durasi', proposal.durasi],
        ['Total Anggaran', formatRp(proposal.anggaran)],
        ['Jumlah Anggota Tim', proposal.members + ' orang'],
        ['Tanggal Submit', proposal.submitted],
      ].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '0.5px solid #f1f5f9' }}>
          <span style={{ fontSize: 13, color: '#64748b', minWidth: 160 }}>{l}</span>
          <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function TabDetail({ proposal }) {
  const sections = [
    { label: 'Latar Belakang', content: 'Konten latar belakang proposal akan ditampilkan di sini setelah integrasi dengan data submission.' },
    { label: 'Rumusan Masalah', content: 'Konten rumusan masalah proposal akan ditampilkan di sini.' },
    { label: 'Tujuan Penelitian', content: 'Konten tujuan penelitian akan ditampilkan di sini.' },
    { label: 'Metodologi', content: 'Konten metodologi penelitian akan ditampilkan di sini.' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sections.map(s => (
        <div key={s.label}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{s.label}</div>
          <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.75, background: '#f8fafc', borderRadius: 8, padding: '14px 16px', border: '0.5px solid #f1f5f9' }}>{s.content}</div>
        </div>
      ))}
    </div>
  )
}

function TabAnggaran({ proposal }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>Rencana Anggaran Biaya</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{formatRp(proposal.anggaran)}</span>
      </div>
      <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: 8, padding: '14px 16px', fontSize: 13, color: '#475569' }}>
        Rincian anggaran per komponen akan ditampilkan di sini setelah integrasi dengan data submission.
      </div>
    </div>
  )
}

function TabPengusul({ proposal }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { nama: proposal.ketua, peran: 'Ketua Peneliti', institusi: proposal.institusi, email: proposal.email },
        ...Array.from({ length: proposal.members - 1 }, (_, i) => ({ nama: `Anggota Tim ${i + 1}`, peran: 'Anggota', institusi: proposal.institusi, email: '-' })),
      ].map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, border: `0.5px solid ${i === 0 ? 'rgba(226,75,74,0.2)' : '#e2e8f0'}`, borderRadius: 10, background: i === 0 ? 'rgba(226,75,74,0.02)' : '#fff' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: i === 0 ? '#E24B4A' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === 0 ? '#fff' : '#64748b', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
            {i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{m.nama}</div>
            <div style={{ fontSize: 12, color: i === 0 ? '#E24B4A' : '#64748b' }}>{m.peran} · {m.institusi}</div>
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>{m.email}</div>
        </div>
      ))}
    </div>
  )
}
