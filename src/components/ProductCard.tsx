import Link from "next/link";
import Image from "next/image";
import { Product } from "@/features/products/product.types";
import ProductPrice from "@/components/ProductPrice";

export default function ProductCard({ product }: { product: Product }) {
  const productRating = product.reviews.length > 0;

  return (
    <li className="mb-3 border border-accent p-4">
      <Link href={`/products/${product.id}`}>
        <div className="flex flex-col lg:flex-row lg:gap-3">
          <div className="relative w-full aspect-square lg:w-48 lg:self-start lg:shrink-0">
            <Image
              src={product.image.url}
              alt={product.image.alt || product.title}
              fill
              sizes="(min-width: 1024px) 192px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl my-2 font-semibold">{product.title}</h2>
            <ProductPrice
              price={product.price}
              discountedPrice={product.discountedPrice}
            />
            {productRating ? (
              <p>{product.rating}/5 ★</p>
            ) : (
              <p className="text-gray-500">No reviews</p>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
