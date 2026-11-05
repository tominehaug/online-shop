import Link from "next/link";
import { ApiResponseAllProducts } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";
import ProductSearch from "@/components/SearchProduct";

const API_URL = "https://v2.api.noroff.dev/online-shop";

async function getAllProducts(): Promise<ApiResponseAllProducts> {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    let errorMessage = `Could not fetch products. Status: ${res.status}`;

    if (res.status === 404) {
      errorMessage = "Products not found (404).";
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

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    const result: ApiResponseAllProducts = await getAllProducts();
    products = result.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error fetching products.";
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>Error: {errorMessage}</p>
        <Link href="/products">&larr; Try again</Link>
        <Link href="/">&larr; Return to home</Link>
      </div>
    );
  }

  return (
    <div>
      <ProductSearch products={products} />
    </div>
  );
}
