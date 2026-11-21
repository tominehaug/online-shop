"use client";
import { useRouter } from "next/navigation";
import useCartStore from "../stores/cartStore";

export default function CheckoutButton() {
  const router = useRouter();
  const reset = useCartStore((state) => state.clearCart);

  const handleCheckout = () => {
    const orderNumber = Math.floor(Math.random() * 900000);
    sessionStorage.setItem(
      "confirmationMessage",
      `Your order (${orderNumber}) has been sent successfully.`,
    );
    reset();
    router.push("/confirmation");
  };
  return (
    <button
      onClick={handleCheckout}
      className="p-5 bg-brand text-background font-heading tracking-wider w-full text-4xl text-center"
    >
      Checkout
    </button>
  );
}
