import { REC_META } from '../data/proposals'

function ScoreBar({ score, max = 100, color }) {
  const pct = (score / max) * 100
  const c = color || (pct >= 80 ? '#16a34a' : pct >= 65 ? '#d97706' : '#dc2626')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 999, transition: 'width .5s ease' }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: c, minWidth: 32, textAlign: 'right' }}>{score}</span>
    </div>
  )
}

function ScoreRing({ score }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const pct = score / 100
  const color = score >= 80 ? '#16a34a' : score >= 65 ? '#d97706' : '#dc2626'
  return (
    <svg width={110} height={110} viewBox="0 0 110 110">
      <circle cx={55} cy={55} r={r} fill="none" stroke="#f1f5f9" strokeWidth={10} />
      <circle
        cx={55} cy={55} r={r} fill="none"
        stroke={color} strokeWidth={10}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
        style={{ transition: 'stroke-dashoffset .6s ease' }}
      />
      <text x={55} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill="#1e293b">{score}</text>
      <text x={55} y={68} textAnchor="middle" fontSize={11} fill="#94a3b8">/ 100</text>
    </svg>
  )
}

export default function AIScorePanel({ ai, compact = false }) {
  const rec = REC_META[ai.recommendation]

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: ai.total >= 80 ? '#16a34a' : ai.total >= 65 ? '#d97706' : '#dc2626' }}>
          {ai.total}
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>AI Score</div>
          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: rec.bg, color: rec.color }}>
            {rec.label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', borderBottom: '0.5px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 16 }}>🤖</span>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b' }}>AI Scoring</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8' }}>Confidence: {ai.confidence}%</span>
      </div>

      <div style={{ padding: 20 }}>
        {/* Total score + recommendation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, paddingBottom: 20, borderBottom: '0.5px solid #f1f5f9' }}>
          <ScoreRing score={ai.total} />
          <div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Rekomendasi AI</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: rec.bg, color: rec.color,
              fontSize: 14, fontWeight: 700, padding: '7px 16px', borderRadius: 999,
            }}>
              {ai.recommendation === 'accept' ? '✓' : ai.recommendation === 'revise' ? '↻' : '✕'}
              {rec.label}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
              Berdasarkan analisis {ai.breakdown.length} seksi proposal
            </div>
          </div>
        </div>

        {/* Section breakdown */}
        <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14 }}>
          Skor per Seksi
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ai.breakdown.map(item => (
            <div key={item.section}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{item.section}</span>
              </div>
              <ScoreBar score={item.score} max={item.max} />
              <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>
                💬 {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
