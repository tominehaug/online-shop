import { useRouter } from "next/navigation";
import useCartStore from "../stores/cartStore";

export default function CheckoutButton() {
  const router = useRouter();
  const reset = useCartStore((state) => state.clearCart);

  const handleCheckout = () => {
    reset();
    router.push("/confirmation");
  };
  return <button onClick={handleCheckout}>Checkout</button>;
}
