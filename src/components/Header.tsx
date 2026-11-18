"use client";
import Link from "next/link";
import Image from "next/image";
import CartIconCounter from "./CartIconCounter";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-background p-4 mb-1 text-brand lg:text-xl text-3xl lg:mx-4">
      <nav className="flex flex-col gap-4 lg:flex-row w-full">
        <div className="flex flex-row justify-between align-center w-full lg:justify-start lg:gap-4">
          <Link href="/">
            <Image
              src="/logo_large.svg"
              alt="Tretten"
              width={152}
              height={72}
              className="object-cover"
            />
          </Link>
          <div className="pt-4 pr-2">
            <CartIconCounter />
          </div>
        </div>
        <div className="flex flex-row justify-start gap-4 w-[90vw] lg:w-full lg:justify-end lg:gap-4">
          <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
            Home
          </Link>
          <Link
            href="/contact"
            className={pathname === "/contact" ? "font-bold" : ""}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
