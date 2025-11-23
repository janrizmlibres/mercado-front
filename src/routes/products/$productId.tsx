import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { graphQLClient } from '../../lib/graphql'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Loader2, Minus, Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'

interface Variant {
  name: string
  options: string[]
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrls: string[]
  category: string
  variants: Variant[]
}

const productQueryDocument = `
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      imageUrls
      category
      variants {
        name
        options
      }
    }
  }
`

const addToCartMutationDocument = `
  mutation CreateItem($input: CreateCartItemDto!) {
    createItem(createCartItemInput: $input) {
      items {
        id
        quantity
      }
    }
  }
`

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
})

function ProductPage() {
  const { productId } = Route.useParams()
  const { isAuthenticated } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  
  // State for selected variants (e.g. { "Size": "M", "Color": "Red" })
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  const { data, isLoading, error } = useQuery<{ product: Product }>({
    queryKey: ['product', productId],
    queryFn: async () =>
      graphQLClient.request(productQueryDocument, { id: productId }),
  })

  const addToCartMutation = useMutation({
    mutationFn: async (input: { productId: string, quantity: number, variants: { name: string, value: string }[] }) => 
      graphQLClient.request(addToCartMutationDocument, { input }),
    onSuccess: () => {
      setAddingToCart(false)
      alert('Added to cart!')
    },
    onError: (err) => {
      setAddingToCart(false)
      alert('Failed to add to cart: ' + (err as Error).message)
    }
  })

  if (isLoading) return <div className="p-20 text-center flex justify-center"><Loader2 className="animate-spin" /></div>
  if (error || !data?.product) return <div className="p-20 text-center text-red-500">Product not found</div>

  const product = data.product

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart')
      return
    }

    // Validate variants
    const missingVariants = product.variants.filter(v => !selectedVariants[v.name])
    if (missingVariants.length > 0) {
      alert(`Please select ${missingVariants.map(v => v.name).join(', ')}`)
      return
    }

    setAddingToCart(true)
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
      variants: Object.entries(selectedVariants).map(([name, value]) => ({ name, value }))
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
             {product.imageUrls?.[selectedImage] ? (
               <img 
                 src={product.imageUrls[selectedImage]} 
                 alt={product.name} 
                 className="w-full h-full object-cover"
                 onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
                 }}
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
             )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.imageUrls.map((url, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square bg-gray-100 rounded overflow-hidden border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'}`}
              >
                <img 
                    src={url} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
                    }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
           <div className="mb-6">
             <span className="text-gray-500 font-bold uppercase tracking-wide text-sm">{product.category}</span>
             <h1 className="text-4xl font-black uppercase mt-2 mb-4 leading-tight">{product.name}</h1>
             <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
           </div>

           <div className="prose text-gray-600 mb-8">
             <p>{product.description}</p>
           </div>

           {/* Variants */}
           <div className="space-y-6 mb-8">
             {product.variants.map((variant) => (
               <div key={variant.name}>
                 <label className="block text-sm font-bold uppercase mb-2">{variant.name}</label>
                 <div className="flex flex-wrap gap-2">
                   {variant.options.map((opt) => (
                     <button
                       key={opt}
                       onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: opt }))}
                       className={`px-4 py-2 border rounded font-medium text-sm transition-all
                         ${selectedVariants[variant.name] === opt 
                           ? 'bg-black text-white border-black' 
                           : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                         }`}
                     >
                       {opt}
                     </button>
                   ))}
                 </div>
               </div>
             ))}
           </div>

           {/* Quantity & Add to Cart */}
           <div className="flex gap-4 mb-8">
             <div className="flex items-center border rounded w-32 justify-between px-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Plus size={16} />
                </button>
             </div>
             
             <button 
               onClick={handleAddToCart}
               disabled={addingToCart}
               className="flex-1 bg-black text-white font-bold uppercase tracking-wide py-4 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
             >
               {addingToCart && <Loader2 className="animate-spin" />}
               {addingToCart ? 'Adding...' : 'Add to Cart'}
             </button>
           </div>

           {!isAuthenticated && (
             <p className="text-sm text-center text-gray-500">
               <Link to="/login" className="underline font-bold text-black">Log in</Link> to purchase this item.
             </p>
           )}
        </div>
      </div>
    </div>
  )
}
