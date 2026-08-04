import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function StatCard({ label, value, color = 'var(--red-600)', sub }) {
  return (
    <div style={{
      background: '#161b27', border: '0.5px solid rgba(255,255,255,0.08)',
      borderRadius: 10, padding: '14px 16px',
    }}>
      <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#475569' }}>{sub}</div>}
    </div>
  )
}

function ApplicantDashboard({ user }) {
  const navigate = useNavigate()
  const proposals = [
    { id: 'GMS-2025-001', title: 'Program Literasi Digital Desa 2025', scheme: 'CFP RIIM', status: 'Dalam Review', date: '12 Jul 2025', color: '#EF9F27' },
    { id: 'GMS-2025-002', title: 'Riset Kolaborasi Energi Terbarukan', scheme: 'CFP Rumah Program', status: 'Disetujui', date: '3 Jun 2025', color: '#97C459' },
    { id: 'GMS-2025-003', title: 'PKR Inovasi Pangan Nusantara', scheme: 'CFP RIIM', status: 'Draft', date: '28 Jul 2025', color: '#64748b' },
  ]
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Selamat datang kembali,</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>{user.name} 👋</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
        <StatCard label="Total Proposal" value="3" sub="Sepanjang 2025" />
        <StatCard label="Dalam Review" value="1" color="#EF9F27" sub="Estimasi 14 hari" />
        <StatCard label="Disetujui" value="1" color="#97C459" sub="Dana siap dicairkan" />
      </div>
      <div style={{ background: '#161b27', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '12px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1' }}>Proposal Saya</span>
          <button onClick={() => navigate('/dashboard/apply')} style={{ fontSize: 12, padding: '7px 14px', borderRadius: 7, background: 'var(--red-400)', border: 'none', color: '#fff', cursor: 'pointer' }}>
            + Ajukan Baru
          </button>
        </div>
        {proposals.map(p => (
          <div key={p.id} style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', marginBottom: 3 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: '#475569' }}>{p.id} · {p.scheme} · {p.date}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: p.color }}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewerDashboard({ user }) {
  const assignments = [
    { id: 'PRO-2025-114', title: 'Inovasi Vaksin Malaria Berbasis Nanoteknologi', applicant: 'Univ. Indonesia', deadline: '25 Agu 2025', status: 'Belum Direview' },
    { id: 'PRO-2025-098', title: 'Pengembangan Baterai Solid-State untuk Kendaraan Listrik', applicant: 'ITB', deadline: '20 Agu 2025', status: 'Sedang Direview' },
    { id: 'PRO-2025-076', title: 'Sistem Deteksi Dini Bencana Berbasis AI', applicant: 'BPPT', deadline: '10 Agu 2025', status: 'Selesai' },
  ]
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Panel Reviewer</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>{user.name}</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
        <StatCard label="Ditugaskan" value="3" sub="Periode Jul–Agu 2025" />
        <StatCard label="Menunggu Review" value="1" color="#EF9F27" sub="Segera selesaikan" />
        <StatCard label="Selesai" value="1" color="#97C459" sub="Terima kasih!" />
      </div>
      <div style={{ background: '#161b27', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#cbd5e1' }}>Penugasan Review</span>
        </div>
        {assignments.map(a => (
          <div key={a.id} style={{ padding: '14px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', marginBottom: 3 }}>{a.title}</div>
              <div style={{ fontSize: 11, color: '#475569' }}>{a.id} · {a.applicant} · Deadline {a.deadline}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: a.status === 'Selesai' ? '#97C459' : a.status === 'Sedang Direview' ? '#85B7EB' : '#EF9F27' }}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminDashboard({ user }) {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Panel Administrator</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9' }}>{user.name}</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 28 }}>
        <StatCard label="Total Proposal" value="247" sub="Tahun 2025" />
        <StatCard label="Menunggu Review" value="58" color="#EF9F27" />
        <StatCard label="Disetujui" value="112" color="#97C459" />
        <StatCard label="Ditolak" value="31" color="#E24B4A" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { label: 'Kelola Skema', icon: '📋', desc: 'Buka/tutup periode pendaftaran' },
          { label: 'Manajemen Reviewer', icon: '👥', desc: 'Assign reviewer ke proposal' },
          { label: 'Laporan & Analitik', icon: '📊', desc: 'Ringkasan dan export data' },
          { label: 'Pengumuman', icon: '📢', desc: 'Publish info CFP/CFR baru' },
        ].map(item => (
          <div key={item.label} style={{
            background: '#161b27', border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: '18px 20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(226,75,74,0.3)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#475569' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role === 'reviewer') navigate('/reviewer', { replace: true })
    if (user.role === 'admin')    navigate('/admin',    { replace: true })
  }, [user])

  if (!user || user.role !== 'applicant') return null

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{
        width: 220, background: '#0d1117', borderRight: '0.5px solid rgba(255,255,255,0.06)',
        padding: '24px 0', flexShrink: 0, display: 'flex', flexDirection: 'column',
      }}>
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px 20px', cursor: 'pointer', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--red-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: 13 }}>✦</span>
          </div>
          <div>
            <div style={{ color: 'var(--red-400)', fontSize: 11, fontWeight: 600 }}>Pendanaan</div>
            <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Riset & Inovasi</div>
          </div>
        </div>

        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: 10, color: '#334155', textTransform: 'uppercase', letterSpacing: '.07em', padding: '0 4px', marginBottom: 8 }}>Menu</div>
          {[
            { icon: '🏠', label: 'Dashboard', active: true },
            { icon: '📄', label: user.role === 'reviewer' ? 'Penugasan Review' : user.role === 'admin' ? 'Semua Proposal' : 'Proposal Saya' },
            { icon: '🔔', label: 'Notifikasi' },
            { icon: '⚙️', label: 'Pengaturan Akun' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px', borderRadius: 8, cursor: 'pointer',
              background: item.active ? 'rgba(226,75,74,0.1)' : 'transparent',
              borderLeft: item.active ? '2px solid var(--red-400)' : '2px solid transparent',
              marginBottom: 2, transition: 'all .15s',
              color: item.active ? '#e2e8f0' : '#64748b', fontSize: 13,
            }}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px', borderTop: '0.5px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--red-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600 }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#e2e8f0' }}>{user.name}</div>
              <div style={{ fontSize: 10, color: '#475569', textTransform: 'capitalize' }}>{user.role}</div>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{ width: '100%', fontSize: 12, padding: '7px', borderRadius: 7, background: 'transparent', border: '0.5px solid rgba(255,255,255,0.1)', color: '#64748b', cursor: 'pointer' }}>
            Keluar
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
        {user.role === 'applicant' && <ApplicantDashboard user={user} />}
        {user.role === 'reviewer'  && <ReviewerDashboard user={user} />}
        {user.role === 'admin'     && <AdminDashboard user={user} />}
      </div>
    </div>
  )
}
