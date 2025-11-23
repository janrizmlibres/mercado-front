import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { graphQLClient } from '../../lib/graphql'
import { ProductCard } from '../../components/ProductCard'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrls: string[]
  category: string
}

const productsByCategoryQueryDocument = `
  query GetProductsByCategory {
    products {
      id
      name
      description
      price
      stock
      imageUrls
      category
    }
  }
`

export const Route = createFileRoute('/collections/$category')({
  loader: ({ params }) => ({ category: params.category }),
  component: CollectionPage,
})

function CollectionPage() {
  const { category } = Route.useLoaderData()
  
  const { data, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ['products'], // We can filter client-side for now since backend doesn't have filter by category query yet
    queryFn: async () =>
      graphQLClient.request(productsByCategoryQueryDocument),
  })

  if (isLoading) return <div className="p-20 text-center">Loading...</div>
  if (error) return <div className="p-20 text-center text-red-500">Error loading products</div>

  // Filter products by category (case insensitive matching)
  const products = data?.products?.filter(p => {
    const productCat = p.category.toUpperCase()
    const targetCat = category.toUpperCase()

    if (targetCat === 'APPAREL') {
        return ['HOODIES', 'SHIRTS', 'JACKETS'].includes(productCat)
    }

    if (targetCat === 'ACCESSORIES' || targetCat === 'BAGS') {
        return ['BAGS', 'HEADWEAR', 'SOCKS', 'STICKERS'].includes(productCat)
    }

    return productCat === targetCat
  }) || []

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="font-sans min-h-screen">
        <div className="bg-gray-100 py-12 px-6 text-center">
            <h1 className="text-4xl font-black uppercase tracking-wider mb-4">{categoryTitle}</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Explore our exclusive collection of {categoryTitle.toLowerCase()}. 
                Limited edition releases and everyday essentials.
            </p>
        </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {products.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
                <p>No products found in this collection.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        )}
      </div>
    </div>
  )
}
