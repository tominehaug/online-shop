import useCartStore from "../../stores/cartStore";

function CartDisplay() {
  const items = useCartStore((state) => state.items);

  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return <p>Your shopping cart is empty.</p>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              margin: "10px 0",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
            }}
          >
            <span>{item.title}</span>
            <br />
            <span>Quantity: {item.quantity}</span>
            <span>Price: {item.discountedPrice} NOK</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              style={{ marginLeft: "10px" }}
            >
              -
            </button>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{ marginLeft: "5px" }}
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} style={{ marginTop: "10px", color: "blue" }}>
        Clear Cart
      </button>
    </div>
  );
}

export default CartDisplay;
