import { useState } from 'react'

const CATEGORIES = ['Honorarium','Bahan Habis Pakai','Perjalanan','Sewa Peralatan','Publikasi','Lain-lain']

function formatRp(val) {
  if (!val) return ''
  return Number(val).toLocaleString('id-ID')
}

export default function StepAnggaran({ data, onChange }) {
  const rows = data.rows || [
    { id: 1, uraian: '', kategori: '', vol: '', satuan: '', harga: '' },
    { id: 2, uraian: '', kategori: '', vol: '', satuan: '', harga: '' },
  ]

  function updateRows(newRows) { onChange('rows', newRows) }

  function updateRow(id, key, val) {
    updateRows(rows.map(r => r.id === id ? { ...r, [key]: val } : r))
  }

  function addRow() {
    updateRows([...rows, { id: Date.now(), uraian: '', kategori: '', vol: '', satuan: '', harga: '' }])
  }

  function removeRow(id) {
    if (rows.length > 1) updateRows(rows.filter(r => r.id !== id))
  }

  const total = rows.reduce((sum, r) => sum + ((parseFloat(r.vol) || 0) * (parseFloat(r.harga) || 0)), 0)

  const byCategory = CATEGORIES.map(cat => ({
    cat,
    total: rows.filter(r => r.kategori === cat).reduce((s, r) => s + ((parseFloat(r.vol) || 0) * (parseFloat(r.harga) || 0)), 0),
  })).filter(c => c.total > 0)

  const cellStyle = { padding: '8px 10px', fontSize: 13, borderBottom: '0.5px solid #e2e8f0' }
  const inpStyle  = { width: '100%', border: 'none', background: 'transparent', fontSize: 13, color: '#1e293b', outline: 'none', fontFamily: 'inherit' }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>Rencana Anggaran Biaya</h3>
        <p style={{ fontSize: 13, color: '#64748b' }}>Rincian penggunaan dana hibah per komponen kegiatan</p>
      </div>

      <div style={{ border: '0.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Uraian Kegiatan','Kategori','Volume','Satuan','Harga Satuan (Rp)','Total (Rp)',''].map(h => (
                <th key={h} style={{ ...cellStyle, fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.04em', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const rowTotal = (parseFloat(row.vol) || 0) * (parseFloat(row.harga) || 0)
              return (
                <tr key={row.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ ...cellStyle, width: '28%' }}>
                    <input style={inpStyle} value={row.uraian} onChange={e => updateRow(row.id, 'uraian', e.target.value)} placeholder="Uraian kegiatan…" />
                  </td>
                  <td style={{ ...cellStyle, width: '16%' }}>
                    <select style={{ ...inpStyle, cursor: 'pointer' }} value={row.kategori} onChange={e => updateRow(row.id, 'kategori', e.target.value)}>
                      <option value="">Pilih…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td style={{ ...cellStyle, width: '8%' }}>
                    <input style={{ ...inpStyle, textAlign: 'right' }} type="number" value={row.vol} onChange={e => updateRow(row.id, 'vol', e.target.value)} placeholder="0" />
                  </td>
                  <td style={{ ...cellStyle, width: '10%' }}>
                    <input style={inpStyle} value={row.satuan} onChange={e => updateRow(row.id, 'satuan', e.target.value)} placeholder="Orang/Unit…" />
                  </td>
                  <td style={{ ...cellStyle, width: '16%' }}>
                    <input style={{ ...inpStyle, textAlign: 'right' }} type="number" value={row.harga} onChange={e => updateRow(row.id, 'harga', e.target.value)} placeholder="0" />
                  </td>
                  <td style={{ ...cellStyle, width: '16%', color: rowTotal > 0 ? '#1e3a8a' : '#94a3b8', fontWeight: 500, textAlign: 'right' }}>
                    {rowTotal > 0 ? `Rp ${formatRp(rowTotal)}` : '—'}
                  </td>
                  <td style={{ ...cellStyle, width: '4%', textAlign: 'center' }}>
                    <button onClick={() => removeRow(row.id)} style={{ border: 'none', background: 'transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
                      onMouseEnter={e => e.currentTarget.style.color = '#E24B4A'}
                      onMouseLeave={e => e.currentTarget.style.color = '#cbd5e1'}
                    >✕</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <button onClick={addRow} style={{ width: '100%', fontSize: 12.5, padding: '8px', borderRadius: 7, border: '0.5px dashed #cbd5e1', background: '#fff', color: '#64748b', cursor: 'pointer', marginBottom: 20, fontFamily: 'inherit', transition: 'all .15s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#E24B4A'; e.currentTarget.style.color = '#E24B4A' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b' }}
      >
        + Tambah baris
      </button>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'start' }}>
        {byCategory.length > 0 && (
          <div style={{ background: '#f8fafc', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 10 }}>Rekapitulasi per Kategori</div>
            {byCategory.map(c => (
              <div key={c.cat} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', borderBottom: '0.5px solid #e2e8f0', color: '#475569' }}>
                <span>{c.cat}</span>
                <span style={{ fontWeight: 500, color: '#1e293b' }}>Rp {formatRp(c.total)}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ background: '#1e293b', borderRadius: 8, padding: '16px 20px', minWidth: 220, textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Total Anggaran Diajukan</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Rp {formatRp(total)}</div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: '#475569', display: 'block', marginBottom: 6 }}>Catatan Anggaran</label>
        <textarea
          value={data.catatan || ''}
          onChange={e => onChange('catatan', e.target.value)}
          rows={3}
          placeholder="Keterangan tambahan mengenai rencana penggunaan anggaran…"
          style={{ width: '100%', border: '0.5px solid #cbd5e1', borderRadius: 7, padding: '9px 12px', fontSize: 13.5, color: '#1e293b', outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.6 }}
        />
      </div>
    </div>
  )
}
