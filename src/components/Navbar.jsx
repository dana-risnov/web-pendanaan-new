import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import brin_logo from "../../public/brin-logo.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div style={{ background: '#0c0a0a' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 100, padding: '20px 40px'
      }}>
        <nav style={{
          maxWidth: 1280, margin: '0 auto',
          background: scrolled ? 'rgba(8,6,6,0.97)' : 'rgba(15,12,12,0.92)',
          backdropFilter: 'blur(10px)',
          border: '0.5px solid rgba(255,255,255,0.08)',
          borderRadius: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px 10px 18px',
          boxShadow: scrolled ? '0 8px 24px rgba(0,0,0,0.35)' : 'none',
          transition: 'all .2s',
        }}>

          {/* Brand */}
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            {/* <div style={{
              width: 36, height: 36, borderRadius: 10, background: 'var(--red-400)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <span style={{ color: '#fff', fontSize: 18 }}>✦</span>
            </div>          */}
            <img src={brin_logo} alt="Logo" className="logo" width={36} height={36} />  
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ color: 'var(--red-400)', fontWeight: 600, fontSize: 13 }}>Pendanaan</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>Riset dan Inovasi</div>
            </div>
          </div>

          {/* Nav links */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: 38, listStyle: 'none' }}>
            {[
              { to: '/', label: 'Beranda' },
              { to: '/pengumuman', label: 'Pengumuman' },
              { to: '/skema', label: 'Skema' },
              { to: '/bantuan', label: 'Bantuan & Kontak' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#e8e4e4',
                    fontWeight: isActive ? 500 : 400,
                    fontSize: 15,
                    padding: '6px 0',
                    borderBottom: isActive ? '2px solid var(--red-400)' : '2px solid transparent',
                    transition: 'color .15s',
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#e8e4e4', fontSize: 13, padding: '6px 8px', borderRadius: 999, cursor: 'pointer' }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(180deg,#E24B4A 50%,#fff 50%)', flexShrink: 0 }}></div>
              ID
            </div>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  onClick={() => navigate('/dashboard')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.08)', borderRadius: 999,
                    padding: '6px 14px 6px 8px', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', background: 'var(--red-400)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 12, fontWeight: 600,
                  }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ color: '#e8e4e4', fontSize: 13 }}>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 999,
                    background: 'transparent', border: '0.5px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.6)', transition: 'all .15s',
                  }}
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    fontSize: 14, fontWeight: 500, padding: '9px 20px', borderRadius: 999,
                    background: 'var(--red-400)', border: 'none', color: '#fff',
                    transition: 'background .15s',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  style={{
                    fontSize: 14, fontWeight: 500, padding: '9px 20px', borderRadius: 999,
                    background: 'transparent', border: '0.5px solid rgba(255,255,255,0.55)',
                    color: 'var(--red-100)', transition: 'all .15s',
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}
