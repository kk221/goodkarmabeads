'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/hooks/useCart'

export default function Cart({ isOpen, onClose }) {
  const { items, total, removeFromCart, updateQuantity } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-[#1d2a3a] shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-[#d3ae8b]/20">
                <h2 className="text-xl font-playfair text-[#d3ae8b]">
                  Your Cart
                </h2>
                <button
                  onClick={onClose}
                  className="text-[#d3ae8b] hover:text-[#d3ae8b]/80"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <p className="text-center text-[#d3ae8b]/60">
                    Your cart is empty
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-4 bg-[#2a3b4f] rounded-lg p-4"
                      >
                        <div className="relative w-20 h-20">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-[#d3ae8b]">{item.name}</h3>
                          <p className="text-[#d3ae8b]/60">${item.price}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity === 1}
                              className="text-[#d3ae8b] disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="text-[#d3ae8b]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-[#d3ae8b]"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="p-4 border-t border-[#d3ae8b]/20">
                <div className="flex justify-between mb-4">
                  <span className="text-[#d3ae8b]">Total</span>
                  <span className="text-[#d3ae8b] font-semibold">
                    ${total.toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={() => {/* Handle checkout */}}
                  disabled={items.length === 0}
                  className="w-full py-3 bg-[#d3ae8b] text-[#1d2a3a] rounded-lg font-semibold hover:bg-[#d3ae8b]/90 disabled:opacity-50 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}