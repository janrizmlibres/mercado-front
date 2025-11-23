import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { graphQLClient } from '../../lib/graphql'
import { Loader2, Trash2 } from 'lucide-react'

const allUsersQueryDocument = `
  query GetAllUsersAdmin {
    users {
      id
      email
    }
  }
`

const removeUserMutationDocument = `
  mutation RemoveUser($id: String!) {
    removeUser(id: $id) {
      id
      email
    }
  }
`

export function UserList() {
  const queryClient = useQueryClient()
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        const token = localStorage.getItem('token')
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'apollo-require-preflight': 'true',
          'x-apollo-operation-name': 'mercado-front',
        }
        if (token) {
          headers['Authentication'] = token
        }
        return graphQLClient.request(allUsersQueryDocument, {}, headers)
    }
  })

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
        const token = localStorage.getItem('token')
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'apollo-require-preflight': 'true',
          'x-apollo-operation-name': 'mercado-front',
        }
        if (token) {
          headers['Authentication'] = token
        }
        return graphQLClient.request(removeUserMutationDocument, { id }, headers)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
      alert('Failed to remove user: ' + (err as Error).message)
    }
  })

  if (isLoading) return <div className="p-8 text-center"><Loader2 className="animate-spin inline" /> Loading users...</div>
  if (error) return <div className="p-8 text-red-500">Error loading users: {(error as Error).message}</div>

  const users = data?.users || []

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mb-6">Manage Users</h2>
      <div className="overflow-x-auto bg-white rounded border shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 border-b uppercase font-bold text-xs text-gray-500">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user: { id: string, email: string }) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs text-gray-500">{user.id}</td>
                <td className="px-6 py-4 font-medium">{user.email}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this user?')) {
                            removeMutation.mutate(user.id)
                        }
                    }}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
                <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No users found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

