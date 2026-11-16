import { Product } from "@/features/products/product.types";
import ProductPrice from "./ProductPrice";

export default function ProductDetailsCard({ product }: { product: Product }) {
  return (
    <li
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <h2>{product.title}</h2>
      <ProductPrice
        price={product.price}
        discountedPrice={product.discountedPrice}
      />
      <p>
        <strong>Rating: </strong>
        {product.rating}/5★
      </p>
      <p>
        <strong>Description: </strong>
        {product.description}
      </p>
      <p>
        <strong>Tags: </strong>
        {product.tags.join(", ")}
      </p>
    </li>
  );
}
