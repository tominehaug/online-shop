"use client";
import useCartStore from "../../stores/cartStore";

function CartSummary() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.discountedPrice;
  }, 0);

  return (
    <div
      style={{
        marginTop: "20px",
        borderTop: "2px solid black",
        paddingTop: "10px",
      }}
    >
      <h3 className="text-xl font-semibold">Summary</h3>
      <p>
        Total items in the cart: <strong>{totalItems}</strong>
      </p>
      <p>
        Total price: <strong>{totalPrice.toFixed(2)} NOK</strong>
      </p>
    </div>
  );
}

export default CartSummary;
