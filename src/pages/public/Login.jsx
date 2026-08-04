import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, error } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // simulate network
    const result = login(email, password)
    setLoading(false)
    if (result.ok) {
      navigate('/dashboard')
    }
  }

  const inp = {
    width: '100%', background: '#1a2133',
    border: '0.5px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '11px 14px',
    fontSize: 14, color: '#e2e8f0', outline: 'none',
    fontFamily: 'inherit', transition: 'border-color .15s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 900px 500px at 50% 0%, rgba(226,75,74,0.2), transparent 60%), #0c0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: 'var(--red-400)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: 22 }}>✦</span>
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
              <div style={{ color: 'var(--red-400)', fontWeight: 600, fontSize: 14 }}>Pendanaan</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Riset dan Inovasi</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(22,27,39,0.9)', backdropFilter: 'blur(12px)',
          border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '36px 32px',
        }}>
          <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Masuk ke RisNov</h1>
          <p style={{ color: '#475569', fontSize: 13.5, marginBottom: 28 }}>
            Belum punya akun?{' '}
            <Link to="/register" style={{ color: 'var(--red-400)' }}>Daftar sekarang</Link>
          </p>

          {/* Demo hint */}
          <div style={{
            background: 'rgba(226,75,74,0.08)', border: '0.5px solid rgba(226,75,74,0.2)',
            borderRadius: 8, padding: '10px 14px', marginBottom: 24, fontSize: 12.5, color: '#94a3b8',
          }}>
            <strong style={{ color: 'var(--red-400)' }}>Demo:</strong> gunakan salah satu akun berikut
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span>applicant@brin.go.id · <em>123456</em></span>
              <span>reviewer@brin.go.id · <em>123456</em></span>
              <span>admin@brin.go.id · <em>123456</em></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@institusi.go.id"
                style={inp}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password" required value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inp}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.3)',
                borderRadius: 7, padding: '10px 14px', fontSize: 13, color: 'var(--red-400)',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', background: loading ? '#555' : 'var(--red-400)',
                border: 'none', borderRadius: 999, padding: '12px',
                color: '#fff', fontSize: 15, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4,
                transition: 'background .15s',
              }}
            >
              {loading ? 'Memverifikasi…' : 'Masuk'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#334155' }}>
          <Link to="/" style={{ color: '#475569' }}>← Kembali ke Beranda</Link>
        </p>
      </div>
    </div>
  )
}
