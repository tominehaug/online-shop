"use client";
import useCartStore from "../../stores/cartStore";
import Image from "next/image";

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
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="relative border-2 border-accent p-4 flex gap-2 my-3 pb-16 sm:pb-4"
          >
            <div className="relative w-30 h-30 shrink-0">
              <Image
                src={item.image.url}
                alt={item.image.alt || item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 ml-2">
              <h3 className="text-lg uppercase">{item.title}</h3>
              <span className="text-lg">
                Price:{" "}
                <strong>
                  {(item.discountedPrice * item.quantity).toFixed(2)} NOK
                </strong>
              </span>
              <div className="flex items-center h-4 my-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-9 bg-accent flex items-center justify-center border-y border-accent text-3xl"
                >
                  <span>-</span>
                </button>
                <span className="w-12 bg-white border border-accent text-center text-xl py-1">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-9 bg-accent flex items-center justify-center border-y border-accent text-3xl"
                >
                  <span className="">+</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-brand border border-brand w-28 text-xl px-2 mt-2 absolute right-4 bottom-4"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart} className="mt-2 text-brand uppercase">
        Clear Cart
      </button>
    </div>
  );
}

export default CartDisplay;
