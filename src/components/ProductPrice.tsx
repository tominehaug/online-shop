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
        <>
          <div>{discountPercentage}% off</div>
          <h3 className="line-through">{price} NOK</h3>
          <h3>{discountedPrice} NOK</h3>
        </>
      ) : (
        <h3>{price} NOK</h3>
      )}
    </div>
  );
}
