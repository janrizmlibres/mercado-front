import { Link, useNavigate } from '@tanstack/react-router'
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { graphQLClient } from '../lib/graphql'

const cartCountQueryDocument = `
  query GetCartCount {
    cart {
      items {
        quantity
      }
    }
  }
`

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['cartCount'],
    queryFn: async () => graphQLClient.request(cartCountQueryDocument),
    enabled: isAuthenticated,
    // Refetch often or use websockets in real app
    refetchInterval: 5000 
  })

  const cartItemCount = data?.cart?.items?.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0) || 0

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  return (
    <div className="w-full font-sans">
      {/* Top Bar */}
      <div className="bg-black text-white text-xs text-center py-2 uppercase tracking-wide">
        Free Shipping over $300 • Guaranteed Authenticity
      </div>

      {/* Main Header */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
            Mercado
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
            <Link to="/" className="hover:text-gray-600 transition-colors">New Arrivals</Link>
            <Link to="/" className="hover:text-gray-600 transition-colors">Best Sellers</Link>
            <Link to="/collections/$category" params={{ category: 'footware' }} className="hover:text-gray-600 transition-colors">Footwear</Link>
            <Link to="/collections/$category" params={{ category: 'apparel' }} className="hover:text-gray-600 transition-colors">Apparel</Link>
            <Link to="/collections/$category" params={{ category: 'accessories' }} className="hover:text-gray-600 transition-colors">Accessories</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </button>
            
            {isAuthenticated ? (
               <div className="relative group z-50">
                 <button className="p-2 hover:bg-gray-100 rounded-full">
                    <User size={20} />
                 </button>
                 {/* Invisible bridge to prevent menu from closing when moving mouse */}
                 <div className="absolute right-0 top-full h-2 w-full"></div>
                 <div className="absolute right-0 top-[calc(100%+0.5rem)] w-48 bg-white border rounded shadow-lg hidden group-hover:block p-2">
                    <div className="px-4 py-2 text-sm font-bold border-b mb-2 truncate" title={user?.email}>{user?.email}</div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500">
                        <LogOut size={16} /> Logout
                    </button>
                 </div>
               </div>
            ) : (
                <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full">
                  <User size={20} />
                </Link>
            )}

            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b py-4 px-4 flex flex-col gap-4 text-sm font-bold uppercase tracking-wide">
            <Link to="/" className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
            <Link to="/" className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>Best Sellers</Link>
            <Link to="/collections/$category" params={{ category: 'footware' }} className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>Footwear</Link>
            <Link to="/collections/$category" params={{ category: 'apparel' }} className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>Apparel</Link>
            <Link to="/collections/$category" params={{ category: 'accessories' }} className="py-2 border-b" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
            <Link to="/cart" className="py-2" onClick={() => setIsMenuOpen(false)}>Cart ({cartItemCount})</Link>
            {isAuthenticated ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="py-2 text-left text-red-500">Logout</button>
            ) : (
                <Link to="/login" className="py-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </header>
    </div>
  )
}

