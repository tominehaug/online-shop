"use client";
import { useEffect, useState } from "react";

export default function ConfirmationMessage() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const confirmationMessage = sessionStorage.getItem("confirmationMessage");
    if (confirmationMessage) {
      setMessage(confirmationMessage);
      sessionStorage.removeItem("confirmationMessage");
    }
  }, []);

  return (
    <div className="text-2xl">
      {message ? <h1>{message}</h1> : <h1>Thank you!</h1>}
    </div>
  );
}
