import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartProduct, Product } from "@/features/products/product.types";

interface CartState {
  items: CartProduct[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
            return { items: updatedItems };
          } else {
            const { id, title, price, discountedPrice, image } = product;
            const newItem: CartProduct = {
              id,
              title,
              price,
              discountedPrice,
              image,
              quantity: 1,
            };
            const updatedItems = [...state.items, newItem];
            return { items: updatedItems };
          }
        }),

      removeItem: (productId) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.id !== productId,
          );
          return { items: updatedItems };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const updatedItems = state.items.filter(
              (item) => item.id !== productId,
            );
            return { items: updatedItems };
          } else {
            const updatedItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity: quantity } : item,
            );
            return { items: updatedItems };
          }
        }),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage", partialize: (state) => ({ items: state.items }) },
  ),
);

export default useCartStore;
