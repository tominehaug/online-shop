import { Product } from "@/features/products/product.types";
import ProductPrice from "./ProductPrice";

export default function ProductDetailsCard({ product }: { product: Product }) {
  return (
    <li className="p-4 list-none">
      <h2 className="text-2xl">{product.title}</h2>
      <ProductPrice
        price={product.price}
        discountedPrice={product.discountedPrice}
      />
      <p className="mt-6">
        <strong>Rating: </strong>
        {product.rating}/5★
      </p>
      <p className="mt-3">
        <strong>Description: </strong>
        {product.description}
      </p>
      <p className="mt-3">
        <strong>Tags: </strong>
        {product.tags.join(", ")}
      </p>
    </li>
  );
}
