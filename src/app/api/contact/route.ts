import { NextResponse } from "next/server";
import { type ContactFormData } from "@/features/contact/contact.schema";

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.fullName || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "All fields must be filled out" },
        { status: 400 },
      );
    }

    const message = `Thank you, ${body.fullName}! Your message about ${body.subject} has been registered.`;
    return NextResponse.json({ message: message }, { status: 201 });
  } catch (error) {
    console.error("Error parsing JSON in POST request:", error);
    return NextResponse.json({ error: "Invalid JSON-format" }, { status: 400 });
  }
}
