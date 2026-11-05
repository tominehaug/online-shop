"use client";
import { Product } from "@/features/products/product.types";
import ProductCard from "@/components/ProductCard";
import { useState, useMemo } from "react";

export default function ProductSearch({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchedProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseSearchTerm),
    );
  }, [products, searchTerm]);

  return (
    <div>
      <label htmlFor="productSearchInput">Search: </label>
      <input
        type="text"
        id="productSearchInput"
        placeholder="Enter product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />

      {searchedProducts.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {searchTerm === "" ? (
            <h2>All products</h2>
          ) : (
            <h2>Search results: {searchTerm}</h2>
          )}
          {searchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>No products match your search: {searchTerm}</p>
      )}
    </div>
  );
}
