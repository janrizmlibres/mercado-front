import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { graphQLClient } from '../../lib/graphql'
import { Loader2, Trash2 } from 'lucide-react'

const allProductsQueryDocument = `
  query GetAllProductsAdmin {
    products {
      id
      name
      price
      stock
      category
      imageUrls
    }
  }
`

const removeProductMutationDocument = `
  mutation RemoveProduct($id: String!) {
    removeProduct(id: $id) {
      id
    }
  }
`

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  imageUrls: string[]
}

export function ProductList() {
  const queryClient = useQueryClient()
  
  const { data, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ['products'],
    queryFn: async () => graphQLClient.request(allProductsQueryDocument)
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
        return graphQLClient.request(removeProductMutationDocument, { id }, headers)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (err) => {
      alert('Failed to remove product: ' + (err as Error).message)
    }
  })

  if (isLoading) return <div className="p-8 text-center"><Loader2 className="animate-spin inline" /> Loading products...</div>
  if (error) return <div className="p-8 text-red-500">Error loading products: {(error as Error).message}</div>

  const products = data?.products || []

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mb-6">Manage Products</h2>
      <div className="overflow-x-auto bg-white rounded border shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 border-b uppercase font-bold text-xs text-gray-500">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    {product.imageUrls?.[0] && <img src={product.imageUrls[0]} className="w-full h-full object-cover" />}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => {
                        if(confirm('Are you sure you want to delete this product?')) {
                            removeMutation.mutate(product.id)
                        }
                    }}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50"
                    title="Delete Product"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No products found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

