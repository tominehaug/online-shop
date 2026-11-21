import CartDisplay from "@/features/shopping-cart/CartDisplay";
import CartSummary from "@/features/shopping-cart/CartSummary";
import CheckoutButton from "@/components/CheckoutButton";
import BackButton from "@/components/BackButton";

export default function ShoppingCartPage() {
  return (
    <div className="sm:w-xl md:w-2xl sm:block sm:mx-auto mb-10 md:mt-10">
      <div className="mx-4 mb-5">
        <BackButton />
        <h1 className="text-xl font-semibold uppercase">Shopping Cart</h1>
        <CartDisplay />
        <CartSummary />
      </div>
      <CheckoutButton />
    </div>
  );
}
