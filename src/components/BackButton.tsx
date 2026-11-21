"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="block mb-4 text-lg"
      type="button"
      onClick={() => router.back()}
    >
      &larr; BACK
    </button>
  );
}
