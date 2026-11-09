import { create } from "zustand";
import { CartProduct } from "@/features/products/product.types";

interface CartState {
  items: CartProduct[];
  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()((set) => ({
  items: [],

  /**
   * Adds an item to the cart or increments its quantity if it already exists.
   * @param {{ id: string }} product - The product object (at least needs id).
   */
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { items: updatedItems };
      } else {
        const newItem = { ...product, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        return { items: updatedItems };
      }
    }),

  /**
   * Removes an item entirely from the cart, regardless of quantity.
   * @param {string} productId - The ID of the product to remove.
   */
  removeItem: (productId) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== productId); // Filter out the item
      return { items: updatedItems }; // Return the new state object
    }),

  /**
   * Updates the quantity of a specific item in the cart.
   * Removes the item if quantity becomes 0 or less.
   * @param {string} productId - The ID of the product to update.
   * @param {number} quantity - The new quantity.
   */
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
}));

export default useCartStore;
