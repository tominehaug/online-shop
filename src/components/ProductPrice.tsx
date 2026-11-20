import { Product } from "../features/products/product.types";

type ProductPriceProps = Pick<Product, "price" | "discountedPrice">;

export default function ProductPrice({
  price,
  discountedPrice,
}: ProductPriceProps) {
  const isDiscounted = discountedPrice < price;
  const discountPercentage = Math.round((1 - discountedPrice / price) * 100);
  return (
    <div>
      {isDiscounted ? (
        <div className="flex flex-row gap-3 items-end">
          <div>
            <h3 className="line-through">{price} NOK</h3>
            <h3 className="font-semibold text-xl">{discountedPrice} NOK</h3>
          </div>
          <div className="bg-accent p-2 w-fit h-fit">
            {discountPercentage}% off
          </div>
        </div>
      ) : (
        <h3 className="font-semibold text-xl">{price} NOK</h3>
      )}
    </div>
  );
}
