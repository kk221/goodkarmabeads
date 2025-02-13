'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/hooks/useCart'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#2a3b4f] rounded-xl overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-playfair text-[#d3ae8b] mb-2">
          {product.name}
        </h3>
        <p className="text-[#d3ae8b]/80 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-white">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg hover:bg-[#d3ae8b]/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}