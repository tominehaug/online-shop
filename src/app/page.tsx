import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-scroll bg-[url('/bg-2.png')] flex-1 bg-no-repeat bg-cover grid place-items-center">
      <div className="flex flex-col gap-10 text-center">
        <h1 className="text-6xl uppercase font-heading tracking-wider">
          Welcome!
        </h1>
        <button className="py-5 px-6 bg-brand text-background text-4xl font-heading tracking-wider transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 animate-bounce hover:animate-none">
          <Link href="/products">Browse Our Products</Link>
        </button>
      </div>
    </div>
  );
}
