import { Link } from '@tanstack/react-router'
import { ProductModel } from '../gql/graphql'

interface ProductCardProps {
  product: Pick<ProductModel, 'id' | 'name' | 'price' | 'imageUrls'> & { category: string }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to="/products/$productId" params={{ productId: product.id }} className="group block h-full">
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4">
        {product.imageUrls?.[0] ? (
            <img 
                src={product.imageUrls[0]} 
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
                }}
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image
            </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
            New
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{product.category}</p>
        <h3 className="font-bold text-sm uppercase leading-tight group-hover:text-gray-600 transition-colors">
            {product.name}
        </h3>
        <p className="text-sm font-medium">
            ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

