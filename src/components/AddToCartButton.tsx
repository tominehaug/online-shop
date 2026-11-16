import useCartStore from "@/stores/cartStore";
import { Product } from "@/features/products/product.types";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}
