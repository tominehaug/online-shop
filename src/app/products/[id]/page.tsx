import Link from "next/link";
import { ApiResponseSingleProduct } from "@/features/products/api.types";

const API_URL = "https://v2.api.noroff.dev/online-shop";

// This page is also a Server Component and can be async
export default async function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;

  const response = await fetch(`${API_URL}/${productId}`, {
    next: { revalidate: 3600 }, // Cache and revalidate every hour
  });

  if (!response.ok) {
    if (response.status === 404) {
      return <p>Product with ID "{productId}" was not found.</p>;
    }
    console.error(`Failed to fetch product ${productId}:`, response.statusText);
    return <p>Could not fetch the product. Please try again later.</p>;
  }

  const result: ApiResponseSingleProduct = await response.json();
  const product = result.data;

  if (!product) {
    return <p>Product data is not available.</p>;
  }

  return (
    <div>
      <Link href="/products" style={{ display: "block", marginBottom: "20px" }}>
        &larr; Back to all products
      </Link>
      <h1>{product.title}</h1>
      <img
        src={product.image.url}
        alt={product.image.alt || product.title}
        style={{ maxWidth: "400px", height: "auto", marginBottom: "20px" }}
      />
      <p>
        <strong>Tags:</strong> {product.tags.join(", ")}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating}
      </p>
      <p>
        <strong>Reviews:</strong> {product.reviews.length}
      </p>
    </div>
  );
}
