import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="p-4 bg-brand text-background text-4xl uppercase mx-4 font-heading tracking-wider"
    >
      Return home
    </Link>
  );
}
