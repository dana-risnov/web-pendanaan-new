import { useState } from 'react'

function ReviewBlock({ title, step, onEdit, children }) {
  return (
    <div style={{ border: '0.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
      <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '0.5px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{title}</span>
        <button onClick={onEdit} style={{ fontSize: 12, color: '#E24B4A', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
      </div>
      <div style={{ padding: '14px 16px' }}>{children}</div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '0.5px solid #f1f5f9', fontSize: 13 }}>
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ color: '#1e293b', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{value || <span style={{ color: '#cbd5e1' }}>Belum diisi</span>}</span>
    </div>
  )
}

function wordCount(html) {
  return html ? html.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length : 0
}

export default function StepRingkasan({ data, onGoToStep }) {
  const [chk1, setChk1] = useState(false)
  const [chk2, setChk2] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const proposalSections = [
    'latar_belakang','rumusan_masalah','tujuan','kontribusi',
    'kajian_teori','metodologi','rencana_kerja','analisis_risiko',
    'dampak_manfaat','sarana_riset','referensi','lampiran',
  ]
  const filledSections = proposalSections.filter(k => wordCount(data.proposal?.[k] || '') > 0).length
  const totalSections  = proposalSections.length

  const budgetRows = data.anggaran?.rows || []
  const totalBudget = budgetRows.reduce((s, r) => s + ((parseFloat(r.vol) || 0) * (parseFloat(r.harga) || 0)), 0)
  const members = data.pengusul?.members || []

  function formatRp(v) { return v ? `Rp ${Number(v).toLocaleString('id-ID')}` : '—' }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: 18, textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '0.5px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>✓</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Proposal Berhasil Dikirim!</h2>
        <p style={{ fontSize: 14, color: '#64748b', maxWidth: 400, lineHeight: 1.7 }}>
          Pengajuan Anda telah diterima dan sedang dalam antrian review. Tim evaluator akan menghubungi ketua peneliti dalam 5–7 hari kerja.
        </p>
        <div style={{ background: '#f8fafc', border: '0.5px solid #e2e8f0', borderRadius: 10, padding: '12px 24px', fontSize: 15, color: '#1e3a8a', fontWeight: 600, letterSpacing: '.04em' }}>
          Ref: GMS-2025-{Math.floor(Math.random() * 90000 + 10000)}
        </div>
        <p style={{ fontSize: 12.5, color: '#94a3b8' }}>Simpan nomor referensi ini untuk memantau status pengajuan Anda</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Ringkasan &amp; Kirim</h3>
        <p style={{ fontSize: 13, color: '#64748b' }}>Periksa kembali seluruh informasi sebelum mengirimkan proposal</p>
      </div>

      <ReviewBlock title="Detail Proposal" onEdit={() => onGoToStep(0)}>
        <Row label="Judul" value={data.detail?.judul} />
        <Row label="Skema" value={data.detail?.skema} />
        <Row label="Topik Riset" value={data.detail?.topik} />
        <Row label="Durasi" value={data.detail?.durasi} />
        <Row label="Institusi" value={data.detail?.institusi} />
        <Row label="Provinsi" value={data.detail?.provinsi} />
      </ReviewBlock>

      <ReviewBlock title="Proposal" onEdit={() => onGoToStep(1)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.round(filledSections / totalSections * 100)}%`, background: filledSections === totalSections ? '#22c55e' : '#E24B4A', borderRadius: 999, transition: 'width .3s' }} />
          </div>
          <span style={{ fontSize: 13, color: '#475569', whiteSpace: 'nowrap' }}>{filledSections}/{totalSections} seksi terisi</span>
        </div>
        {filledSections < totalSections && (
          <p style={{ fontSize: 12, color: '#d97706', marginTop: 8 }}>⚠ Lengkapi semua seksi proposal sebelum mengirim</p>
        )}
      </ReviewBlock>

      <ReviewBlock title="Anggaran" onEdit={() => onGoToStep(2)}>
        <Row label="Total anggaran diajukan" value={formatRp(totalBudget)} />
        <Row label="Jumlah komponen" value={budgetRows.filter(r => r.uraian).length + ' item'} />
      </ReviewBlock>

      <ReviewBlock title="Tim Pengusul" onEdit={() => onGoToStep(3)}>
        {members.length === 0 ? (
          <p style={{ fontSize: 13, color: '#94a3b8' }}>Belum ada anggota tim</p>
        ) : members.map((m, i) => (
          <Row key={i} label={m.peran || `Anggota ${i + 1}`} value={m.nama || '-'} />
        ))}
      </ReviewBlock>

      {/* Declaration */}
      <div style={{ background: 'rgba(226,75,74,0.04)', border: '0.5px solid rgba(226,75,74,0.15)', borderRadius: 10, padding: 18, marginBottom: 18, fontSize: 13, color: '#475569', lineHeight: 1.75 }}>
        <strong style={{ color: '#1e293b' }}>Pernyataan Pemohon</strong><br />
        Dengan mengirimkan formulir ini, kami menyatakan bahwa seluruh informasi yang diberikan adalah benar dan akurat. Kami memahami bahwa data palsu dapat mengakibatkan diskualifikasi dan tindakan hukum sesuai peraturan yang berlaku.
      </div>

      {[
        [chk1, setChk1, 'Saya menyatakan bahwa data dan dokumen yang diunggah adalah sah dan dapat dipertanggungjawabkan.'],
        [chk2, setChk2, 'Saya menyetujui Syarat & Ketentuan pengajuan hibah dan bersedia mengikuti proses seleksi.'],
      ].map(([checked, setChecked, label], i) => (
        <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} style={{ marginTop: 2, accentColor: '#E24B4A', width: 15, height: 15, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{label}</span>
        </label>
      ))}

      <button
        disabled={!chk1 || !chk2}
        onClick={() => setSubmitted(true)}
        style={{
          width: '100%', marginTop: 20, padding: '13px',
          borderRadius: 10, border: 'none', fontFamily: 'inherit',
          fontSize: 15, fontWeight: 600, cursor: chk1 && chk2 ? 'pointer' : 'not-allowed',
          background: chk1 && chk2 ? '#E24B4A' : '#e2e8f0',
          color: chk1 && chk2 ? '#fff' : '#94a3b8',
          transition: 'all .2s',
        }}
      >
        {chk1 && chk2 ? '📤 Kirim Proposal' : 'Centang pernyataan untuk melanjutkan'}
      </button>
    </div>
  )
}
