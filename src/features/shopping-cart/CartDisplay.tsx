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
      <ul className="relative">
        {items.map((item) => (
          <li
            key={item.id}
            className="border-2 border-accent p-4 flex gap-2 my-3"
          >
            <div className="relative w-28 h-28 shrink-0">
              <Image
                src={item.image.url}
                alt={item.image.alt || item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 ml-2">
              <h3 className="text-lg uppercase">{item.title}</h3>
              <span className="text-md">
                Price: <strong>{item.discountedPrice} NOK</strong>
              </span>
              <div className="flex items-center mt-2 gap-3">
                <div className="flex items-center h-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 bg-accent flex items-center justify-center border-y border-accent text-lg"
                  >
                    <span>-</span>
                  </button>
                  <span className="w-8 bg-white border border-accent text-center text-lg">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 bg-accent flex items-center justify-center border-y border-accent text-lg"
                  >
                    <span className="">+</span>
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-brand border border-brand w-20"
                >
                  Remove
                </button>
              </div>
            </div>
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
