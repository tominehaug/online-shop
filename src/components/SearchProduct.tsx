"use client";
import { Product } from "@/features/products/product.types";
import ProductCard from "@/components/ProductCard";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
    <div className="p-3">
      <label htmlFor="productSearchInput" className="hidden">
        Search:{" "}
      </label>
      <div className="w-full flex flex-row gap-2 items-center mb-4">
        <input
          type="text"
          id="productSearchInput"
          placeholder="Enter product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border-2 border-softbrand flex-1 focus:outline-brand focus:outline-2 focus:border-background"
        />
        <div className="text-brand text-2xl">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
      {searchTerm === "" ? (
        <h2 className="text-xl font-bold mb-2">All products</h2>
      ) : (
        <h2 className="text-xl font-bold mb-2">Search results: {searchTerm}</h2>
      )}
      {searchedProducts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
