import Link from "next/link";
import { ApiResponseSingleProduct } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";

const API_URL = "https://v2.api.noroff.dev/online-shop";

async function getProduct(id: string): Promise<ApiResponseSingleProduct> {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Could not fetch product with ID: ${id}`;

    if (res.status === 404) {
      errorMessage = `Product not found (404).`;
    } else {
      try {
        const errorData = await res.json();
        if (
          errorData.errors &&
          errorData.errors[0] &&
          errorData.errors[0].message
        ) {
          errorMessage = errorData.errors[0].message;
        }
      } catch {
        errorMessage = `${errorMessage} ${res.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }

  return res.json();
}

// This page is also a Server Component and can be async
export default async function SingleProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const result: ApiResponseSingleProduct = await getProduct(id);
  const product: Product = result.data;

  if (!product) {
    return <p>Product data is not available.</p>;
  }

  return (
    <div>
      <Link href="/products" style={{ display: "block", marginBottom: "20px" }}>
        &larr; Back to all products
      </Link>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
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
