import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { gql } from '../../gql/gql'
import { graphQLClient } from '../../lib/graphql'
import { Category, CreateProductDto } from '../../gql/graphql'
import { Loader2, Plus, Trash } from 'lucide-react'

// Prefer environment configuration for uploads service, with a dev fallback.
const UPLOADS_URL =
  import.meta.env.VITE_UPLOADS_URL ?? 'http://localhost:3006'

const createProductMutationDocument = gql(`
  mutation CreateProduct($input: CreateProductDto!) {
    createProduct(createProductInput: $input) {
      id
      name
    }
  }
`)

export function AddProductForm() {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  // Form State
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState<Category>(Category.Footware)
  const [imageUrls, setImageUrls] = useState<string[]>([''])
  const [variants, setVariants] = useState<{ name: string; options: string }[]>([])

  const mutation = useMutation({
    mutationFn: async (input: CreateProductDto) => {
      const token = localStorage.getItem('token')
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'apollo-require-preflight': 'true',
        'x-apollo-operation-name': 'mercado-front',
      }
      if (token) {
        headers['Authentication'] = token
      }
      return graphQLClient.request(createProductMutationDocument, { input }, headers)
    },
    onSuccess: () => {
      setSuccessMessage('Product created successfully!')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setName('')
      setDescription('')
      setPrice('')
      setStock('')
      setImageUrls([''])
      setVariants([])
      setError('')
      window.scrollTo(0, 0)
    },
    onError: (err) => {
      setError('Failed to create product. ' + (err as Error).message)
      window.scrollTo(0, 0)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const formattedVariants = variants
        .filter(v => v.name && v.options)
        .map(v => ({
            name: v.name,
            options: v.options.split(',').map(o => o.trim()).filter(o => o)
        }))

      const input: CreateProductDto = {
        name,
        description,
        price: parseFloat(price),
        stock: parseFloat(stock),
        category: category,
        imageUrls: imageUrls.filter(url => url.trim() !== ''),
        variants: formattedVariants
      }

      await mutation.mutateAsync(input)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...imageUrls]
    newImages[index] = value
    setImageUrls(newImages)
  }

  const handleFileUpload = async (index: number, file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(`${UPLOADS_URL}/uploads/image`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      handleImageChange(index, data.url)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload image')
    }
  }

  const addImageField = () => setImageUrls([...imageUrls, ''])
  const removeImageField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const addVariant = () => setVariants([...variants, { name: '', options: '' }])
  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }
  
  const updateVariant = (index: number, field: 'name' | 'options', value: string) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setVariants(newVariants)
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold uppercase mb-6">Create New Product</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded border shadow-sm">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase mb-1">Product Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
              placeholder="e.g., Air Jordan 1 Retro High"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Description</label>
            <textarea 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none h-32"
              placeholder="Product details..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold uppercase mb-1">Price</label>
              <input 
                type="number" 
                required
                min="0"
                step="0.01"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase mb-1">Stock</label>
              <input 
                type="number" 
                required
                min="0"
                value={stock}
                onChange={e => setStock(e.target.value)}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value as Category)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
            >
              {Object.values(Category).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-bold uppercase mb-1">Images</label>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                    <input 
                      type="text"
                      value={url}
                      onChange={e => handleImageChange(index, e.target.value)}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
                      placeholder="Enter URL or upload image..."
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                handleFileUpload(index, e.target.files[0])
                            }
                        }}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800"
                    />
                </div>
                {url && (
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 border">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
                <button 
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded self-center"
                  disabled={imageUrls.length === 1}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
            <button 
              type="button"
              onClick={addImageField}
              className="text-sm font-bold uppercase flex items-center gap-2 mt-2 hover:text-gray-600"
            >
              <Plus size={16} /> Add Image
            </button>
          </div>
        </div>

        {/* Variants */}
        <div className="border-t pt-6">
            <h3 className="text-lg font-bold uppercase mb-4">Variants</h3>
            <div className="space-y-4">
                {variants.map((variant, index) => (
                    <div key={index} className="border p-4 rounded bg-gray-50 relative">
                        <button 
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <Trash size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Option Name</label>
                                <input 
                                    type="text"
                                    value={variant.name}
                                    onChange={e => updateVariant(index, 'name', e.target.value)}
                                    className="w-full border p-2 rounded text-sm"
                                    placeholder="e.g. Size"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Values (Comma separated)</label>
                                <input 
                                    type="text"
                                    value={variant.options}
                                    onChange={e => updateVariant(index, 'options', e.target.value)}
                                    className="w-full border p-2 rounded text-sm"
                                    placeholder="e.g. S, M, L, XL"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <button 
                    type="button"
                    onClick={addVariant}
                    className="w-full border-2 border-dashed border-gray-300 p-4 rounded flex items-center justify-center gap-2 font-bold uppercase text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                >
                    <Plus size={20} /> Add Variant Group
                </button>
            </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-black text-white font-bold uppercase py-4 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

