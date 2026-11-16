"use client";

import { useState } from "react";
import useCartStore from "@/stores/cartStore";
import { Product } from "@/features/products/product.types";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };
  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {added && <p>Your item was added to the cart!</p>}
    </div>
  );
}
