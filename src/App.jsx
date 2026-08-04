import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './styles/globals.css'

import Navbar                  from './components/Navbar'
import Beranda                 from './pages/public/Beranda'
import Pengumuman              from './pages/public/Pengumuman'
import Skema                   from './pages/public/Skema'
import Bantuan                 from './pages/public/Bantuan'
import Login                   from './pages/public/Login'
import Dashboard               from './pages/dashboard/Dashboard'
import ApplicationForm         from './pages/dashboard/ApplicationForm'
import AdminPanel              from './pages/dashboard/AdminPanel'
import AdminProposalDetail     from './pages/dashboard/AdminProposalDetail'
import ReviewerPanel           from './pages/dashboard/ReviewerPanel'
import ReviewerProposalDetail  from './pages/dashboard/ReviewerProposalDetail'

function Register() {
  return (
    <div style={{ minHeight: '100vh', background: '#0c0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <div><h1>Register</h1><p style={{ marginTop: 10, color: '#475569' }}>Coming soon.</p></div>
    </div>
  )
}

function PublicLayout({ children }) {
  return <><Navbar />{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"           element={<PublicLayout><Beranda /></PublicLayout>} />
          <Route path="/pengumuman" element={<PublicLayout><Pengumuman /></PublicLayout>} />
          <Route path="/skema"      element={<PublicLayout><Skema /></PublicLayout>} />
          <Route path="/bantuan"    element={<PublicLayout><Bantuan /></PublicLayout>} />

          {/* Auth */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Applicant */}
          <Route path="/dashboard"       element={<Dashboard />} />
          <Route path="/dashboard/apply" element={<ApplicationForm />} />

          {/* Admin */}
          <Route path="/admin"                  element={<AdminPanel />} />
          <Route path="/admin/proposal/:id"     element={<AdminProposalDetail />} />

          {/* Reviewer */}
          <Route path="/reviewer"               element={<ReviewerPanel />} />
          <Route path="/reviewer/proposal/:id"  element={<ReviewerProposalDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
