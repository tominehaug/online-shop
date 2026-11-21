import Link from "next/link";
import { ApiResponseAllProducts } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";
import ProductSearch from "@/components/SearchProduct";
import { getAllProducts } from "@/features/products/api";

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
      <div className="p-4">
        <h2 className="text-2xl">Something went wrong</h2>
        <p>
          <strong>Error:</strong> {errorMessage}
        </p>
        <Link href="/products">&larr; Try again</Link>
        <Link href="/">&larr; Return to home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm md:max-w-5xl px-2 lg:mt-8">
      <ProductSearch products={products} />
    </div>
  );
}
