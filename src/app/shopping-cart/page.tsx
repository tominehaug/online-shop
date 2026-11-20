import CartDisplay from "@/features/shopping-cart/CartDisplay";
import CartSummary from "@/features/shopping-cart/CartSummary";
import CheckoutButton from "@/components/CheckoutButton";

export default function ShoppingCartPage() {
  return (
    <div className="mx-4">
      <h1 className="text-xl font-semibold">Shopping Cart</h1>
      <CartDisplay />
      <CartSummary />
      <CheckoutButton />
    </div>
  );
}
