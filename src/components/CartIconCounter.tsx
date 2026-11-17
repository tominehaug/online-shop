"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import useCartStore from "@/stores/cartStore";

export default function CartIconCounter() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <Link href="/shopping-cart" className="color-brand relative text-4xl">
      <FontAwesomeIcon icon={faBasketShopping} />
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          minWidth: "20px",
          height: "20px",
          padding: "0 4px",
          borderRadius: "9px",
          backgroundColor: "#ef3d12",
          color: "white",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {itemCount}
      </span>
    </Link>
  );
}
