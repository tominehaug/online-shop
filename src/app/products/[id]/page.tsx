import Link from "next/link";
import Image from "next/image";
import { ApiResponseSingleProduct } from "@/features/products/api.types";
import { Product } from "@/features/products/product.types";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import ReviewSection from "@/components/ReviewSection";
import AddToCartButton from "@/components/AddToCartButton";

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
      <div className="p-4">
        <h2 className="text-2xl">Something went wrong</h2>
        <p>
          <strong>Error:</strong> {errorMessage}
        </p>
        <Link href="/products">&larr; Back to all products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto block lg:max-w-4xl">
      <Link href="/products" className="block m-4">
        &larr; All products
      </Link>
      <div className="lg:flex lg:flex-row lg:flex-wrap lg:gap-4">
        <div className="relative w-full aspect-square lg:w-md lg:self-start lg:shrink-0 lg:ml-4 lg:grow-0">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            sizes="(min-width: 1024px) 192px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:grow lg:basis-55">
          <ProductDetailsCard product={product} />
          <AddToCartButton product={product} />
        </div>
        <div className="lg:grow lg:basis-55">
          <h2 className="text-xl font-bold p-4">Reviews:</h2>
          <ReviewSection review={product.reviews} />
        </div>
      </div>
    </div>
  );
}
