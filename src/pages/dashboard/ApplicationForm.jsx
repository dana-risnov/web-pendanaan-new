import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StepDetail    from './form/StepDetail'
import StepProposal  from './form/StepProposal'
import StepAnggaran  from './form/StepAnggaran'
import StepPengusul  from './form/StepPengusul'
import StepRingkasan from './form/StepRingkasan'

const STEPS = [
  { label: 'Detail',    desc: 'Informasi dasar' },
  { label: 'Proposal',  desc: 'Isi naskah' },
  { label: 'Anggaran',  desc: 'Rencana biaya' },
  { label: 'Pengusul',  desc: 'Tim peneliti' },
  { label: 'Ringkasan', desc: 'Review & kirim' },
]

export default function ApplicationForm() {
  const { user } = useAuth()
  const navigate  = useNavigate()
  const [step, setStep]     = useState(0)
  const [saved, setSaved]   = useState(false)
  const [data, setData]     = useState({
    detail:   {},
    proposal: {},
    anggaran: {},
    pengusul: {},
  })

  if (!user) { navigate('/login'); return null }

  const KEYS = ['detail', 'proposal', 'anggaran', 'pengusul']

  function handleChange(stepKey, field, value) {
    setData(prev => ({ ...prev, [stepKey]: { ...prev[stepKey], [field]: value } }))
  }

  function saveDraft() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function goStep(n) {
    if (n >= 0 && n <= 4) setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

      {/* Top navbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/dashboard')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20, color: '#64748b', lineHeight: 1, padding: 4 }}>☰</button>
          <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
          <div style={{ background: '#f1f5f9', border: '0.5px solid #e2e8f0', borderRadius: 6, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#475569' }}>LOGO</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ border: 'none', background: 'transparent', fontSize: 20, color: '#64748b', cursor: 'pointer' }}>🔔</button>
          <button style={{ border: 'none', background: 'transparent', fontSize: 20, color: '#64748b', cursor: 'pointer' }}>🆔</button>
          <div style={{ background: '#f1f5f9', border: '0.5px solid #e2e8f0', borderRadius: 999, padding: '5px 14px', fontSize: 13, fontWeight: 500, color: '#475569' }}>Pengusul</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: 999, padding: '5px 14px 5px 8px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E24B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>{user.name.charAt(0)}</div>
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{user.name}</span>
          </div>
        </div>
      </div>

      {/* Form header */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '20px 32px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Form Registrasi Proposal</h1>
        <p style={{ fontSize: 13.5, color: '#64748b', marginBottom: 24 }}>
          {data.detail?.skema || 'Pusat Kolaborasi Riset'} — {data.detail?.durasi || 'Pusat Kolaborasi Riset (Sepanjang Tahun)'}
        </p>

        {/* Step bar */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 0, maxWidth: 900, margin: '0 auto' }}>
          {STEPS.map((s, i) => {
            const done    = i < step
            const active  = i === step
            const locked  = i > step
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 80 }}>
                  <button
                    onClick={() => goStep(i)}
                    style={{
                      width: 36, height: 36, borderRadius: '50%', border: 'none',
                      background: done ? '#1e293b' : active ? '#E24B4A' : '#f1f5f9',
                      color: done || active ? '#fff' : '#94a3b8',
                      fontSize: done ? 16 : 14, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .2s',
                    }}
                  >
                    {done ? '✓' : i + 1}
                  </button>
                  <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? '#E24B4A' : done ? '#374151' : '#94a3b8' }}>{s.label}</span>
                  {/* Progress bar under label */}
                  <div style={{ width: 64, height: 3, borderRadius: 999, background: done ? '#1e293b' : active ? '#E24B4A' : '#e2e8f0', transition: 'background .2s' }} />
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: done ? '#1e293b' : '#e2e8f0', marginBottom: 28, transition: 'background .2s' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step content tabs (for step 1 only — Detail Proposal / Unggah Dokumen) */}
      {step === 1 && (
        <div style={{ background: '#fff', borderBottom: '0.5px solid #e2e8f0', padding: '0 32px', display: 'flex', gap: 24 }}>
          <div style={{ padding: '12px 4px', borderBottom: '2px solid #1e293b', fontSize: 13.5, fontWeight: 600, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            📄 Detail Proposal
          </div>
          <div style={{ padding: '12px 4px', borderBottom: '2px solid transparent', fontSize: 13.5, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            📎 Unggah Dokumen
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '0.5px solid #e2e8f0', padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

          {step === 0 && <StepDetail   data={data.detail}   onChange={(f, v) => handleChange('detail', f, v)} />}
          {step === 1 && <StepProposal data={data.proposal} onChange={(f, v) => handleChange('proposal', f, v)} />}
          {step === 2 && <StepAnggaran data={data.anggaran} onChange={(f, v) => handleChange('anggaran', f, v)} />}
          {step === 3 && <StepPengusul data={data.pengusul} onChange={(f, v) => handleChange('pengusul', f, v)} />}
          {step === 4 && <StepRingkasan data={data} onGoToStep={goStep} />}

          {/* Nav buttons */}
          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 20, borderTop: '0.5px solid #f1f5f9' }}>
              {step > 0 ? (
                <button onClick={() => goStep(step - 1)} style={btnSecondary}>← Sebelumnya</button>
              ) : <div />}
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={saveDraft} style={btnSecondary}>
                  {saved ? '✓ Tersimpan' : '💾 Simpan Draft'}
                </button>
                <button onClick={() => goStep(step + 1)} style={btnPrimary}>
                  {step === 3 ? 'Ke Ringkasan →' : 'Lanjut →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const btnSecondary = {
  fontSize: 13.5, padding: '10px 20px', borderRadius: 8,
  border: '0.5px solid #e2e8f0', background: '#fff', color: '#475569',
  cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
}
const btnPrimary = {
  fontSize: 13.5, padding: '10px 22px', borderRadius: 8,
  border: 'none', background: '#E24B4A', color: '#fff',
  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
}
