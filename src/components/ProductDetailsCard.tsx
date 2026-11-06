import Image from "next/image";
import { Product } from "@/features/products/product.types";

export default function ProductDetailsCard({ product }: { product: Product }) {
  return (
    <li
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div style={{ position: "relative", width: "200px", height: "200px" }}>
        <Image
          src={product.image.url}
          alt={product.image.alt || product.title}
          fill
          sizes="200px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2>{product.title}</h2>
      <h3>
        {product.price} NOK, Discounted: {product.discountedPrice} NOK
      </h3>
      <p>
        <strong>Rating:</strong>
        {product.rating}/5
      </p>
      <p>
        <strong>Description:</strong>
        {product.description}
      </p>
      <p>
        <strong>Tags:</strong>
        {product.tags.join(", ")}
      </p>
    </li>
  );
}
