import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isOpen: false,
      
      // Toggle cart visibility
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      
      // Add item to cart
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              total: state.total + product.price
            }
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
            total: state.total + product.price
          }
        })
      },

      // Remove item from cart
      removeFromCart: (productId) => {
        set((state) => {
          const item = state.items.find(item => item.id === productId)
          if (!item) return state
          
          return {
            items: state.items.filter(item => item.id !== productId),
            total: state.total - (item.price * item.quantity)
          }
        })
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return

        set((state) => {
          const item = state.items.find(item => item.id === productId)
          if (!item) return state

          const quantityDiff = quantity - item.quantity
          
          return {
            items: state.items.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            ),
            total: state.total + (item.price * quantityDiff)
          }
        })
      },

      // Clear cart
      clearCart: () => set({ items: [], total: 0 }),

      // Get cart item count
      getItemCount: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      // Format price
      formatPrice: (price) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
      }
    }),
    {
      name: 'shopping-cart', // name of the item in localStorage
      skipHydration: true // prevents hydration issues
    }
  )
)