import { useState, ReactNode } from 'react'
import { AuthContext, User } from './AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  const login = (newUser: User, newToken: string) => {
    setUser(newUser)
    setToken(newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout,
      isAuthenticated: !!user && !!token 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

