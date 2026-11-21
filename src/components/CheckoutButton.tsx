"use client";
import { useRouter } from "next/navigation";
import useCartStore from "../stores/cartStore";
import { useState } from "react";

export default function CheckoutButton() {
  const router = useRouter();
  const reset = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);
  const [error, setError] = useState("");

  const handleCheckout = () => {
    if (items.length === 0) {
      setError("Please add items before checking out.");
      return;
    }

    setError("");
    const orderNumber = Math.floor(Math.random() * 900000);
    sessionStorage.setItem(
      "confirmationMessage",
      `Your order (${orderNumber}) has been sent successfully.`,
    );
    reset();
    router.push("/confirmation");
  };

  return (
    <div className="text-center">
      <button
        onClick={handleCheckout}
        className={`p-5 bg-brand text-background font-heading tracking-wider w-full text-4xl text-center ${error ? "opacity-50" : ""}`}
      >
        Checkout
      </button>
      {error && <p className="m-4 text-lg">{error}</p>}
    </div>
  );
}
