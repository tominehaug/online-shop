import Link from "next/link";
import { ApiResponseSingleProduct } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";

const API_URL = "https://v2.api.noroff.dev/online-shop";

async function getProduct(id: string): Promise<ApiResponseSingleProduct> {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  //   if (response.status === 404) {
  //     return <p>Product with ID "{id}" was not found.</p>;
  //   }

  if (!response.ok) {
    throw new Error(`Kunne ikke hente produkt med id: ${id}`);
  }

  return response.json();
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
