import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AddProductForm } from '../components/admin/AddProductForm'
import { ProductList } from '../components/admin/ProductList'
import { UserList } from '../components/admin/UserList'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  const [activeTab, setActiveTab] = useState<'add-product' | 'manage-products' | 'manage-users'>('add-product')

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl font-sans">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Admin Dashboard</h1>

      <div className="flex border-b mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('add-product')}
          className={`px-6 py-3 font-bold uppercase text-sm whitespace-nowrap ${
            activeTab === 'add-product' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          Add Product
        </button>
        <button
          onClick={() => setActiveTab('manage-products')}
          className={`px-6 py-3 font-bold uppercase text-sm whitespace-nowrap ${
            activeTab === 'manage-products' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          Manage Products
        </button>
        <button
          onClick={() => setActiveTab('manage-users')}
          className={`px-6 py-3 font-bold uppercase text-sm whitespace-nowrap ${
            activeTab === 'manage-users' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-500 hover:text-black'
          }`}
        >
          Manage Users
        </button>
      </div>

      <div>
        {activeTab === 'add-product' && <AddProductForm />}
        {activeTab === 'manage-products' && <ProductList />}
        {activeTab === 'manage-users' && <UserList />}
      </div>
    </div>
  )
}
