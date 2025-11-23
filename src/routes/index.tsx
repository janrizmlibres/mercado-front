import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { graphQLClient } from '../lib/graphql'
import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'

const allProductsQueryDocument = `
  query GetProducts {
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

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrls: string[]
  category: string
}

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, isLoading, error } = useQuery<{ products: Product[] }>({
    queryKey: ['products'],
    queryFn: async () =>
      graphQLClient.request(allProductsQueryDocument),
  })

  if (isLoading) return <div className="p-20 text-center">Loading...</div>
  if (error) return (
    <div className="p-20 text-center text-red-500">
        Error loading products. <br/>
        <pre className="text-xs mt-2 text-gray-500 whitespace-pre-wrap max-w-lg mx-auto">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(error as any).response?.errors?.[0]?.message || (error as Error).message}
        </pre>
    </div>
  )

  const products = data?.products || []

  return (
    <div className="font-sans">
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Just Dropped</h2>
            <a href="#" className="text-sm font-bold uppercase underline hover:text-gray-600">View All</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {products.length === 0 ? (
                <div className="col-span-2 md:col-span-4 text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg font-medium">No products dropped yet.</p>
                    <p className="text-gray-400 text-sm">Check back soon for the latest heat.</p>
                </div>
            ) : (
                products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))
            )}
        </div>
      </section>

      {/* Brand Section Example */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 text-center">Trending Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
                {['Nike', 'Adidas', 'Yeezy', 'Jordan', 'New Balance', 'Asics'].map((brand) => (
                    <div key={brand} className="grayscale hover:grayscale-0 transition-all cursor-pointer font-bold text-xl text-gray-400 hover:text-black">
                        {brand}
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  )
}
