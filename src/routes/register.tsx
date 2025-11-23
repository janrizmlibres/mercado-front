import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { graphQLClient } from '../lib/graphql'
import { Loader2 } from 'lucide-react'
import { CreateUserDto } from '../gql/graphql'

const createUserMutationDocument = `
  mutation CreateUser($input: CreateUserDto!) {
    createUser(createUserInput: $input) {
      id
      email
    }
  }
`

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  // const { login } = useAuth() // Auto-login not implemented yet

  const mutation = useMutation({
    mutationFn: async (input: CreateUserDto) => 
      graphQLClient.request(createUserMutationDocument, { input }),
    onSuccess: () => {
      alert('Account created! Please login.')
      navigate({ to: '/login' })
    },
    onError: (err: Error & { response?: { errors?: Array<{ extensions?: { originalError?: { message?: string | string[] } } }> } }) => {
      // Try to extract specific validation message
      const gqlError = err.response?.errors?.[0];
      const validationMessages = gqlError?.extensions?.originalError?.message;
      
      if (Array.isArray(validationMessages)) {
        setError(validationMessages.join(', '));
      } else if (validationMessages) {
        setError(validationMessages);
      } else {
        setError('Registration failed: ' + (err.message || 'Unknown error'));
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    mutation.mutate({ email, password })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-black uppercase mb-8 text-center">Create Account</h1>
        
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
            <p className="text-xs text-gray-500 mt-1">Must contain 8+ chars, uppercase, lowercase, number, and symbol.</p>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Confirm Password</label>
            <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-black outline-none"
                placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full bg-black text-white font-bold uppercase py-4 rounded hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
          >
            {mutation.isPending && <Loader2 className="animate-spin" />}
            {mutation.isPending ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="underline font-bold text-black">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
