import Link from "next/link";
import Image from "next/image";
import { ApiResponseAllProducts } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";

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
      <h1>All products</h1>

      {products && products.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <h2>{product.title}</h2>
              <h3>
                {product.price} NOK, Discounted: {product.discountedPrice} NOK
              </h3>
              <Image
                src={product.image.url}
                alt={product.image.alt || product.title}
                fill
                style={{ objectFit: "cover", maxWidth: "200px" }}
              />
              <Link href={`/products/${product.id}`}>See details</Link>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen produkter funnet.</p>
      )}
    </div>
  );
}
