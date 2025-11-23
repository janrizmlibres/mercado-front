import { Link } from '@tanstack/react-router'

export function Hero() {
  return (
    <div className="relative w-full h-[600px] bg-gray-900 text-white overflow-hidden">
        {/* Background Image Placeholder - In a real app, use a real image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        <img 
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop" 
            alt="Sneaker Hero" 
            className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
            <span className="text-sm font-bold tracking-widest uppercase mb-4 text-gray-300">New Collection</span>
            <h1 className="text-4xl md:text-7xl font-black uppercase mb-6 leading-tight max-w-2xl">
                Step Into <br/> The Future
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                Discover the latest drops in premium footwear and streetwear. Exclusive styles you won't find anywhere else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/collections/$category" params={{ category: 'footware' }} className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors text-center">
                    Shop Footwear
                </Link>
                <Link to="/collections/$category" params={{ category: 'apparel' }} className="border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors text-center">
                    Shop Apparel
                </Link>
            </div>
        </div>
    </div>
  )
}

