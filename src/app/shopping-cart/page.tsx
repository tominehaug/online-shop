import CartDisplay from "@/features/shopping-cart/CartDisplay";
import CartSummary from "@/features/shopping-cart/CartSummary";
import CheckoutButton from "@/components/CheckoutButton";

export default function ShoppingCartPage() {
  return (
    <div>
      <h1>Shopping Cart</h1>
      <CartDisplay />
      <CartSummary />
      <CheckoutButton />
    </div>
  );
}
