import Link from "next/link"; // For linking to individual game pages later
import { ApiResponseAllProducts } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";

const API_URL = "https://v2.api.noroff.dev/online-shop"; // Define the API URL as a constant

async function getAllProducts(): Promise<ApiResponseAllProducts> {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 }, // Revalidate cached data every 3600 seconds (1 hour)
  });

  if (!res.ok) {
    throw new Error("Could not fetch products.");
  }

  return res.json();
}

// Make the component async to use await for fetching
export default async function ProductsPage() {
  // Fetch data directly in the Server Component
  const result: ApiResponseAllProducts = await getAllProducts();
  const products: Product[] = result.data;

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
              <img
                src={product.image.url}
                alt={product.image.alt || product.title}
                style={{ maxWidth: "200px", height: "auto" }}
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
