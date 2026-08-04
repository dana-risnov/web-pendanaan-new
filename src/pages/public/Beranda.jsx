import { useNavigate } from 'react-router-dom'

function LayananCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.045)',
        border: '0.5px solid rgba(255,255,255,0.1)',
        borderRadius: 10, padding: 20,
        display: 'flex', flexDirection: 'column', minHeight: 220,
        cursor: 'pointer', transition: 'all .15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.045)'}
    >
      <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 700, fontStyle: 'italic', marginBottom: 10 }}>{title}</h3>
      <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, lineHeight: 1.65, flex: 1 }}>{desc}</p>
      <div style={{
        marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.85)', color: '#171313',
        fontSize: 13, fontWeight: 500, padding: '8px 16px',
        borderRadius: 999, width: 'fit-content',
      }}>
        Selengkapnya ↗
      </div>
    </div>
  )
}

function ChipButton({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 999, padding: '8px 14px', fontSize: 12.5,
        color: '#3a2a26', display: 'inline-flex', alignItems: 'center',
        gap: 6, cursor: 'pointer', transition: 'all .15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-400)'; e.currentTarget.style.color = 'var(--red-600)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = '#2a2a3a'; }}
    >
      <span>{icon}</span>{label}
    </div>
  )
}

export default function Beranda() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero band */}
      <div style={{
        background: 'radial-gradient(ellipse 900px 420px at 18% -10%, rgba(75,75,226,0.55), transparent 60%), radial-gradient(ellipse 700px 380px at 55% -20%, rgba(75,75,226,0.35), transparent 55%), #0c0a0a',
        padding: '88px 0 64px',
      }}>
        <div className="wrap">
          <div style={{ color: 'var(--red-400)', fontSize: 13, fontWeight: 600, letterSpacing: '.12em', marginBottom: 14 }}>
            SELAMAT DATANG DI
          </div>
          <h1 style={{ color: '#fff', fontSize: 46, fontWeight: 700, lineHeight: 1.18, maxWidth: 560, marginBottom: 26 }}>
            Pendanaan Riset &amp; <span style={{ color: 'var(--red-400)' }}>Inovasi BRIN</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
            Pilih skema pendanaan yang sesuai dengan kebutuhan riset Anda untuk berkontribusi dalam ekosistem riset nasional
          </p>
        </div>
      </div>

      {/* Layanan section */}
      <section style={{ background: '#fff', padding: '64px 0 56px' }}>
        <div className="wrap">
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Layanan Kami</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 14, maxWidth: 640 }}>
              Pilih layanan yang Anda butuhkan untuk memulai pendanaan riset dan inovasi. Untuk mengetahui detail setiap layanan klik button Selengkapnya.
            </p>
          </div>

          <div style={{
            borderRadius: 16, padding: 28,
            background: 'radial-gradient(ellipse 600px 320px at 30% 100%, rgba(226,226,226,0.45), transparent 65%), radial-gradient(ellipse 500px 300px at 80% 100%, rgba(226,226,226,0.3), transparent 60%), #0c0a0a',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <LayananCard
                title="CFP RIIM"
                desc="CFP RIIM dikelola oleh BRIN, memfasilitasi pengajuan pendanaan dengan beberapa skema yang tersedia antara lain RIIM Kompetisi, RIIM Ekspedisi, Pusat Kolaborasi Riset (PKR), RIIM Invitasi, RIIM Kolaborasi, RIIM Start-Up"
                onClick={() => navigate('/skema')}
              />
              <LayananCard
                title="CFP Rumah Program"
                desc="CFP Rumah Program memfasilitasi pengajuan pendanaan yang dikelola oleh organisasi riset BRIN"
                onClick={() => navigate('/skema')}
              />
              <LayananCard
                title="Call for Reviewer"
                desc="Program yang memfasilitasi para peneliti untuk menjadi reviewer proposal"
                onClick={() => navigate('/skema')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RIVO Assistant */}
      <section style={{ padding: '0 0 80px', background: '#fff' }}>
        <div className="wrap">
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            background: 'linear-gradient(135deg, #F0F4Ff 0%, #DAE3FF 45%, #B8C8FB 100%)',
            padding: '40px 44px', display: 'grid',
            gridTemplateColumns: '1fr 1.15fr', gap: 32, alignItems: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
              <div style={{
                width: 140, height: 140, borderRadius: '50%', background: 'var(--red-400)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 8px rgba(226,226,226,0.12)',
                fontSize: 64,
              }}>
                🤖
              </div>
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 500, color: '#3a2a26', marginBottom: 8, lineHeight: 1.5, maxWidth: 340 }}>
                Temukan program pendanaan yang sesuai keinginan dengan bantuan RisNov Digital Assistant
              </p>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--red-600)', marginBottom: 10 }}>RisNov Digital Assistant</h2>
              <p style={{ fontSize: 13.5, color: '#4a3c38', lineHeight: 1.7, maxWidth: 480, marginBottom: 18 }}>
                RIVO adalah RisNov Digital Assistant yang dapat membantu Anda menemukan skema terbaik, mengetahui perbedaan skema, hingga pertanyaan seputar pendanaan yang anda ajukan
              </p>
              <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--red-600)', marginBottom: 10 }}>Mulai dengan contoh ini</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <ChipButton icon="🔍" label="Temukan Program" onClick={() => navigate('/skema')} />
                  <ChipButton icon="↔" label="Bandingkan Program" onClick={() => navigate('/skema')} />
                  <ChipButton icon="📰" label="Apa informasi terbaru?" onClick={() => navigate('/pengumuman')} />
                  <button
                    onClick={() => navigate('/skema')}
                    style={{
                      background: 'var(--red-400)', color: '#fff', border: 'none',
                      borderRadius: 999, padding: '8px 14px', fontSize: 12.5,
                      fontWeight: 500, cursor: 'pointer', display: 'inline-flex',
                      alignItems: 'center', gap: 6,
                    }}
                  >
                    Eksplor lainnya →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0c0a0a', padding: '36px 0', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12.5 }}>
          © 2025 Direktorat Pendanaan Riset dan Inovasi — BRIN. Hak cipta dilindungi.
        </p>
      </footer>
    </div>
  )
}
