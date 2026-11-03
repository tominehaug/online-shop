import { NextResponse } from "next/server";

interface OrderData {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export async function POST(request: Request) {
  try {
    const body: OrderData = await request.json();

    if (body.items.length === 0) {
      return NextResponse.json(
        { error: "Order cannot be empty" },
        { status: 400 },
      );
    }

    const orderId = Math.floor(Math.random() * 1000000);

    const message = `Thank you! Your order has been registered. Order ID: ${orderId}`;
    return NextResponse.json({ message: message }, { status: 201 });
  } catch (error) {
    console.error("Error parsing JSON in POST request:", error);
    return NextResponse.json({ error: "Invalid JSON-format" }, { status: 400 });
  }
}
