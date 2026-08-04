import { createContext, useContext, useState } from 'react'

// Mock users — replace with real API later
const MOCK_USERS = [
  { id: 1, name: 'Budi Santoso',   email: 'applicant@brin.go.id', password: '123456', role: 'applicant' },
  { id: 2, name: 'Dr. Siti Rahma', email: 'reviewer@brin.go.id',  password: '123456', role: 'reviewer'  },
  { id: 3, name: 'Admin BRIN',     email: 'admin@brin.go.id',     password: '123456', role: 'admin'     },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  function login(email, password) {
    const found = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      setError(null)
      return { ok: true, role: safeUser.role }
    } else {
      setError('Email atau password salah.')
      return { ok: false }
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
