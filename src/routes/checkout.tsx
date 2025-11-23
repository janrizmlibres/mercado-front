import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { graphQLClient } from '../lib/graphql'
import { Loader2, ShieldCheck, CreditCard } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { CreateOrderDto, Status } from '../gql/graphql'

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
  query GetCartForCheckout {
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

const createOrderMutationDocument = `
  mutation CreateOrder($input: CreateOrderDto!) {
    createOrder(createOrderInput: $input) {
      order {
        id
        totalPrice
      }
      redirectUrl
    }
  }
`

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

function CheckoutPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
    country: 'Philippines'
  })

  const { data, isLoading: cartLoading } = useQuery<{ cart: { items: CartItem[] }, products: Product[] }>({
    queryKey: ['cartCheckout'],
    queryFn: async () => graphQLClient.request(cartQueryDocument),
    enabled: isAuthenticated
  })

  const createOrderMutation = useMutation({
    mutationFn: async (input: CreateOrderDto) => 
      graphQLClient.request(createOrderMutationDocument, { input }),
    onSuccess: (data) => {
      // Mock payment redirect
      setLoading(false)
      if (data.createOrder.redirectUrl) {
        window.location.href = data.createOrder.redirectUrl
      } else {
        alert('Order placed successfully!')
        navigate({ to: '/' })
      }
    },
    onError: (err) => {
      setLoading(false)
      alert('Checkout failed: ' + (err as Error).message)
    }
  })

  if (!isAuthenticated) {
     navigate({ to: '/login' })
     return null
  }

  if (cartLoading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin" /></div>

  const cartItems = data?.cart?.items || []
  const products = data?.products || []
  const enrichedItems = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId)
    return { ...item, product }
  }).filter(item => item.product)

  if (enrichedItems.length === 0) {
    navigate({ to: '/cart' })
    return null
  }

  const subtotal = enrichedItems.reduce((acc, item) => 
    acc + ((item.product?.price || 0) * item.quantity), 0
  )

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Construct Order Payload
    const orderItems = enrichedItems.map(item => ({
        name: item.product!.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product!.price,
        variants: item.variants.map(v => ({ name: v.name, value: v.value }))
    }))

    const input: CreateOrderDto = {
        orderItems,
        status: Status.Pending,
        totalPrice: subtotal
    }

    createOrderMutation.mutate(input)
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-black uppercase mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Shipping Form */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
            Shipping Address
          </h2>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Street Address</label>
              <input 
                required
                type="text" 
                value={address.street}
                onChange={e => setAddress({...address, street: e.target.value})}
                className="w-full border p-3 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="123 Main St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-xs font-bold uppercase mb-1">City</label>
                <input 
                    required
                    type="text" 
                    value={address.city}
                    onChange={e => setAddress({...address, city: e.target.value})}
                    className="w-full border p-3 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="Makati"
                />
                </div>
                <div>
                <label className="block text-xs font-bold uppercase mb-1">ZIP Code</label>
                <input 
                    required
                    type="text" 
                    value={address.zip}
                    onChange={e => setAddress({...address, zip: e.target.value})}
                    className="w-full border p-3 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="1200"
                />
                </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Country</label>
              <select 
                value={address.country}
                onChange={e => setAddress({...address, country: e.target.value})}
                className="w-full border p-3 rounded bg-gray-50 outline-none"
              >
                <option>Philippines</option>
              </select>
            </div>
          </form>
        </div>

        {/* Order Review */}
        <div className="bg-gray-50 p-6 rounded h-fit">
          <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
            {enrichedItems.map(item => (
                <div key={item.id} className="flex gap-4 text-sm">
                    <div className="w-12 h-12 bg-white rounded overflow-hidden flex-shrink-0">
                        <img src={item.product?.imageUrls?.[0]} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">{item.product?.name}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2 mb-6">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
            </div>
            <div className="flex justify-between text-lg font-black pt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="w-full bg-black text-white font-bold uppercase py-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
            {loading ? 'Processing...' : 'Pay with Maya'}
          </button>
          
          <div className="mt-4 flex justify-center items-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} />
            Secure SSL Encryption
          </div>
        </div>
      </div>
    </div>
  )
}
