import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/" className="p-4 bg-brand text-background text-2xl uppercase">
      Return home
    </Link>
  );
}
