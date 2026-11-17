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

  return <div>{message ? <p>{message}</p> : <p>Thank you!</p>}</div>;
}
