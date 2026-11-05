import Link from "next/link";
import Image from "next/image";
import { Product } from "@/features/products/product.types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <Link href={`/products/${product.id}`}>
        <h2>{product.title}</h2>
        <h3>
          {product.price} NOK, Discounted: {product.discountedPrice} NOK
        </h3>
        <div style={{ position: "relative", width: "200px", height: "200px" }}>
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="200px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
    </li>
  );
}
