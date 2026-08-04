import { useState } from 'react'
import RichEditor from '../../../components/RichEditor'

const SECTIONS = [
  {
    group: 'Judul dan Abstrak',
    items: [{ key: 'abstrak_detail', label: 'Abstrak Detail' }],
  },
  {
    group: 'Pendahuluan',
    items: [
      { key: 'latar_belakang',  label: 'Latar Belakang' },
      { key: 'rumusan_masalah', label: 'Rumusan Masalah' },
      { key: 'tujuan',          label: 'Tujuan' },
      { key: 'kontribusi',      label: 'Kontribusi' },
    ],
  },
  {
    group: 'Kajian Teori & Kerangka Konseptual',
    items: [{ key: 'kajian_teori', label: 'Kajian Teori & Kerangka Konseptual' }],
  },
  {
    group: 'Metodologi',
    items: [{ key: 'metodologi', label: 'Metodologi Penelitian' }],
  },
  {
    group: 'Rencana Kerja',
    items: [{ key: 'rencana_kerja', label: 'Rencana Kerja & Jadwal' }],
  },
  {
    group: 'Analisis Risiko',
    items: [{ key: 'analisis_risiko', label: 'Analisis Risiko' }],
  },
  {
    group: 'Dampak dan Manfaat',
    items: [{ key: 'dampak_manfaat', label: 'Dampak dan Manfaat' }],
  },
  {
    group: 'Sarana Riset',
    items: [{ key: 'sarana_riset', label: 'Sarana dan Prasarana Riset' }],
  },
  {
    group: 'Referensi',
    items: [{ key: 'referensi', label: 'Daftar Referensi' }],
  },
  {
    group: 'Lampiran',
    items: [{ key: 'lampiran', label: 'Lampiran' }],
  },
]

function wordCount(html) {
  return html ? html.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length : 0
}

function totalFilled(data) {
  return SECTIONS.flatMap(s => s.items).filter(i => wordCount(data[i.key] || '') > 0).length
}

export default function StepProposal({ data, onChange }) {
  const allItems = SECTIONS.flatMap(s => s.items)
  const [activeKey, setActiveKey] = useState(allItems[1].key)

  const activeSection = allItems.find(i => i.key === activeKey)
  const filled = totalFilled(data)
  const total  = allItems.length
  const pct    = Math.round((filled / total) * 100)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '188px 1fr 180px', gap: 0, minHeight: 600 }}>

      {/* Left sidebar — section navigator */}
      <div style={{
        borderRight: '0.5px solid #e2e8f0', paddingRight: 0,
        overflowY: 'auto', maxHeight: 640,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', padding: '0 0 10px 0', marginBottom: 4 }}>
          Struktur Proposal
        </div>
        {SECTIONS.map(section => (
          <div key={section.group} style={{ marginBottom: 6 }}>
            <div style={{
              fontSize: 12.5, fontWeight: 600, color: '#374151',
              padding: '5px 8px', borderRadius: 6,
              background: section.items.some(i => i.key === activeKey) ? '#f1f5f9' : 'transparent',
              cursor: section.items.length === 1 ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
              onClick={() => section.items.length === 1 && setActiveKey(section.items[0].key)}
            >
              {section.group}
              {section.items.length === 1 && wordCount(data[section.items[0].key] || '') > 0 && (
                <span style={{ color: '#22c55e', fontSize: 14 }}>✓</span>
              )}
            </div>
            {section.items.length > 1 && section.items.map(item => (
              <div
                key={item.key}
                onClick={() => setActiveKey(item.key)}
                style={{
                  fontSize: 12.5, padding: '5px 8px 5px 16px', cursor: 'pointer',
                  borderRadius: 6, marginTop: 2,
                  background: activeKey === item.key ? '#E24B4A' : 'transparent',
                  color: activeKey === item.key ? '#fff' : '#475569',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all .15s',
                }}
                onMouseEnter={e => { if (activeKey !== item.key) e.currentTarget.style.background = '#f1f5f9' }}
                onMouseLeave={e => { if (activeKey !== item.key) e.currentTarget.style.background = 'transparent' }}
              >
                {item.label}
                {wordCount(data[item.key] || '') > 0 && (
                  <span style={{ color: activeKey === item.key ? '#fff' : '#22c55e', fontSize: 13 }}>✓</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Center — active editor */}
      <div style={{ padding: '0 24px', overflowY: 'auto', maxHeight: 640 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e293b', marginBottom: 20 }}>
          {SECTIONS.find(s => s.items.some(i => i.key === activeKey))?.group}
        </h3>

        {/* Render all items in the active group */}
        {SECTIONS
          .find(s => s.items.some(i => i.key === activeKey))
          ?.items.map(item => (
            <div key={item.key} style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 14.5, fontWeight: 600, color: '#1e293b', marginBottom: 10 }}>
                {item.label}<span style={{ color: '#E24B4A' }}>*</span>
              </div>
              <RichEditor
                key={item.key}
                placeholder={`Tulis ${item.label.toLowerCase()} di sini…`}
                value={data[item.key] || ''}
                onChange={val => onChange(item.key, val)}
              />
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 5, textAlign: 'right' }}>
                {wordCount(data[item.key] || '')} kata
              </div>
            </div>
          ))
        }

        {/* Navigation between sections */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, paddingTop: 16, borderTop: '0.5px solid #e2e8f0' }}>
          {allItems.findIndex(i => i.key === activeKey) > 0 ? (
            <button
              onClick={() => setActiveKey(allItems[allItems.findIndex(i => i.key === activeKey) - 1].key)}
              style={navBtn}
            >
              ← Sebelumnya
            </button>
          ) : <div />}
          {allItems.findIndex(i => i.key === activeKey) < allItems.length - 1 && (
            <button
              onClick={() => setActiveKey(allItems[allItems.findIndex(i => i.key === activeKey) + 1].key)}
              style={{ ...navBtn, background: '#E24B4A', color: '#fff', borderColor: '#E24B4A' }}
            >
              Selanjutnya →
            </button>
          )}
        </div>
      </div>

      {/* Right — progress panel */}
      <div style={{ borderLeft: '0.5px solid #e2e8f0', paddingLeft: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>
          Progres Proposal
        </div>

        {/* Progress ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="40" cy="40" r="32" fill="none"
              stroke={pct === 100 ? '#22c55e' : '#E24B4A'} strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - pct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
              style={{ transition: 'stroke-dashoffset .4s ease' }}
            />
            <text x="40" y="45" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b">{pct}%</text>
          </svg>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{filled} / {total} seksi terisi</div>
        </div>

        {/* Section checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {SECTIONS.map(section => {
            const allFilled = section.items.every(i => wordCount(data[i.key] || '') > 0)
            const anyFilled = section.items.some(i => wordCount(data[i.key] || '') > 0)
            return (
              <div
                key={section.group}
                onClick={() => setActiveKey(section.items[0].key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontSize: 11.5, padding: '5px 6px', borderRadius: 6, cursor: 'pointer',
                  color: allFilled ? '#16a34a' : anyFilled ? '#d97706' : '#94a3b8',
                  background: section.items.some(i => i.key === activeKey) ? '#f8fafc' : 'transparent',
                }}
              >
                <span style={{ fontSize: 13 }}>{allFilled ? '✓' : anyFilled ? '◑' : '○'}</span>
                {section.group}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const navBtn = {
  fontSize: 13, padding: '8px 16px', borderRadius: 7,
  border: '0.5px solid #cbd5e1', background: '#fff',
  color: '#475569', cursor: 'pointer', fontFamily: 'inherit',
}
