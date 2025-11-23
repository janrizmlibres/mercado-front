import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { graphQLClient } from '../lib/graphql'
import { Loader2, Trash, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface Product {
  id: string
  name: string
  price: number
  imageUrls: string[]
}

interface CartItem {
  id: string
  productId: string
  quantity: number
  variants: { name: string, value: string }[]
}

const cartQueryDocument = `
  query GetCart {
    cart {
      items {
        id
        productId
        quantity
        variants {
          name
          value
        }
      }
    }
    products {
      id
      name
      price
      imageUrls
    }
  }
`

const updateCartItemMutationDocument = `
  mutation UpdateItem($id: String!, $input: UpdateCartItemDto!) {
    updateItem(id: $id, updateCartItemInput: $input) {
      id
      quantity
    }
  }
`

const removeCartItemMutationDocument = `
  mutation RemoveItem($id: String!) {
    removeItem(id: $id) {
        items {
            id
        }
    }
  }
`

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const { isAuthenticated } = useAuth()
  
  const { data, isLoading, error, refetch } = useQuery<{ cart: { items: CartItem[] }, products: Product[] }>({
    queryKey: ['cart'],
    queryFn: async () => graphQLClient.request(cartQueryDocument),
    enabled: isAuthenticated
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, change }: { id: string, change: number }) => 
      graphQLClient.request(updateCartItemMutationDocument, { id, input: { change } }),
    onSuccess: () => refetch()
  })

  const removeMutation = useMutation({
    mutationFn: async (id: string) => 
      graphQLClient.request(removeCartItemMutationDocument, { id }),
    onSuccess: () => refetch()
  })

  if (!isAuthenticated) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-black uppercase mb-4">Your bag is empty</h2>
      <p className="mb-8 text-gray-600">Please login to view your cart.</p>
      <Link to="/login" className="bg-black text-white px-8 py-3 font-bold uppercase rounded">
        Login
      </Link>
    </div>
  )

  if (isLoading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin" /></div>
  if (error) return <div className="p-20 text-center text-red-500">Error loading cart</div>

  const cartItems = data?.cart?.items || []
  const products = data?.products || []

  // Map cart items to product details
  const enrichedItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId)
    return {
      ...item,
      product
    }
  }).filter(item => item.product) // Filter out items where product no longer exists

  const subtotal = enrichedItems.reduce((acc, item) => {
    return acc + ((item.product?.price || 0) * item.quantity)
  }, 0)

  if (enrichedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-2xl font-black uppercase mb-4">Your bag is empty</h2>
        <Link to="/" className="text-sm underline font-bold uppercase hover:text-gray-600">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-black uppercase mb-8">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {enrichedItems.map((item) => (
            <div key={item.id} className="flex gap-6 border-b pb-8">
              <div className="w-32 h-32 bg-gray-100 flex-shrink-0">
                {item.product?.imageUrls?.[0] && (
                  <img 
                    src={item.product.imageUrls[0]} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold uppercase text-lg">{item.product?.name}</h3>
                  <p className="font-bold">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="text-sm text-gray-500 mb-4 space-y-1">
                  {item.variants.map(v => (
                    <p key={v.name}>{v.name}: {v.value}</p>
                  ))}
                  <p>${item.product?.price.toFixed(2)} each</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={() => updateMutation.mutate({ id: item.id, change: -1 })}
                      disabled={item.quantity <= 1 || updateMutation.isPending}
                      className="p-2 hover:bg-gray-100 text-gray-500"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateMutation.mutate({ id: item.id, change: 1 })}
                      disabled={updateMutation.isPending}
                      className="p-2 hover:bg-gray-100 text-gray-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeMutation.mutate(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 h-fit rounded">
          <h3 className="font-bold uppercase mb-6 text-lg">Order Summary</h3>
          
          <div className="space-y-4 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600 font-bold">Free</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-8 flex justify-between items-center">
            <span className="font-bold uppercase">Total</span>
            <span className="font-black text-xl">${subtotal.toFixed(2)}</span>
          </div>

          <Link 
            to="/checkout"
            className="block w-full bg-black text-white font-bold uppercase text-center py-4 rounded hover:bg-gray-800 transition-colors"
          >
            Checkout
          </Link>
          
          <div className="mt-4 text-xs text-center text-gray-500">
            Free shipping on orders over $300. Guaranteed Authenticity.
          </div>
        </div>
      </div>
    </div>
  )
}

