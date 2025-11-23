import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Loader2 } from 'lucide-react'

const AUTH_URL = import.meta.env.VITE_AUTH_URL ?? 'http://localhost:3001'

// Since the login endpoint is REST, we'll fetch it directly
export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${AUTH_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const { user, token } = await response.json()
      
      if (!token) {
        throw new Error('Authentication token not received.')
      }
      
      login(user, token)
      navigate({ to: '/' })
      
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-black uppercase mb-8 text-center">Login</h1>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Email Address</label>
            <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-black outline-none"
                placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Password</label>
            <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-black outline-none"
                placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white font-bold uppercase py-4 rounded hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="underline font-bold text-black">Create one</Link>
        </div>
      </div>
    </div>
  )
}
