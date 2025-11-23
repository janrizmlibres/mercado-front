import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 pt-16 pb-8 border-t font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-black text-lg mb-4 uppercase">Mercado</h3>
            <p className="text-sm text-gray-600 mb-4">
              Premium streetwear and luxury fashion. Guaranteed authentic.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gray-900"><Twitter size={20} /></a>
              <a href="#" className="hover:text-gray-900"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gray-900"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-black">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-black">Best Sellers</Link></li>
              <li><Link to="/collections/$category" params={{ category: 'footware' }} className="hover:text-black">Footwear</Link></li>
              <li><Link to="/collections/$category" params={{ category: 'apparel' }} className="hover:text-black">Apparel</Link></li>
              <li><Link to="/collections/$category" params={{ category: 'accessories' }} className="hover:text-black">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-black">Help Center</Link></li>
              <li><Link to="/" className="hover:text-black">Authenticity</Link></li>
              <li><Link to="/" className="hover:text-black">Shipping</Link></li>
              <li><Link to="/" className="hover:text-black">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 border border-gray-300 focus:border-black outline-none text-sm"
              />
              <button className="bg-black text-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-800 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mercado. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-black transition-colors">Admin</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

