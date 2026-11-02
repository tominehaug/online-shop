import Link from "next/link"; // For linking to individual game pages later
import { ApiResponseAllProducts } from "@/features/products/api.types";

const API_URL = "https://v2.api.noroff.dev/online-shop"; // Define the API URL as a constant

// Make the component async to use await for fetching
export default async function ProductsPage() {
  // Fetch data directly in the Server Component
  const response = await fetch(API_URL);

  if (!response.ok) {
    // Handle errors, e.g., by throwing an error or returning an error message
    // For now, we'll log and show a simple message.
    // In a real app, you'd use an error.tsx file or more robust error handling.
    console.error("Failed to fetch games:", response.statusText);
    return <p>Could not fetch products. Please try again later.</p>;
  }

  const result: ApiResponseAllProducts = await response.json();
  const products = result.data;

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
              <p>{product.description}</p>
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
