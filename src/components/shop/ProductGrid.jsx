'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const categories = ['All', 'Crystals', 'Tarot', 'Jewelry', 'Accessories']

export default function ProductGrid({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-[#d3ae8b] text-[#1d2a3a]'
                : 'bg-[#2a3b4f] text-[#d3ae8b] hover:bg-[#d3ae8b]/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#d3ae8b]/60">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  )
}