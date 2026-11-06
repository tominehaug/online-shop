import Link from "next/link";
import Image from "next/image";
import { ApiResponseSingleProduct } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import ReviewSection from "@/components/ReviewSection";

const API_URL = "https://v2.api.noroff.dev/online-shop";

async function getProduct(id: string): Promise<ApiResponseSingleProduct> {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Could not fetch product with ID: ${id}`;

    if (res.status === 404) {
      errorMessage = "Product not found (404).";
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

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: Product;

  try {
    const result: ApiResponseSingleProduct = await getProduct(id);
    product = result.data;
  } catch (error) {
    console.error(`Error fetching product with ID: ${id}`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Error fetching product data.";
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>Error: {errorMessage}</p>
        <Link href="/products">&larr; Back to all products</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/products" style={{ display: "block", marginBottom: "20px" }}>
        &larr; Back to all products
      </Link>
      <Image
        src={product.image.url}
        alt={product.image.alt || product.title}
        fill
        style={{
          objectFit: "cover",
          maxWidth: "400px",
          height: "auto",
          marginBottom: "20px",
        }}
      />
      <ProductDetailsCard product={product} />
      <ReviewSection review={product.reviews} />
    </div>
  );
}
