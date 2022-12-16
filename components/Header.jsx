import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-xl m-auto p-4">
      <Link href="/">
        <h1 className="font-bold hover:opacity-80 transition">
          next <span className="font-light">xkcd</span>
        </h1>
      </Link>
      <div>
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/" className="text-sm font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className="text-sm font-semibold">
              Search
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
