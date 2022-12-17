import Link from "next/link";
import React, { useRef, useState } from "react";

export const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const getValue = () => searchRef.current?.value;

  const q = searchRef.current?.value;
  const handleChange = () => {
    const q = getValue();
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };
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
            <input
              className="text-xs rounded-xl border-gray px-4 py-1 border"
              ref={searchRef}
              type="search"
              onChange={handleChange}
            />
            <div className="relative">
              {results.length > 0 && (
                <div className="absolute top-0 left-0">
                  <ul className="w-full border-2 rounded-lg border-gray-50 shadow-xl text-base bg-white">
                    <li
                      className="m-0 px-2 py-1 hover:bg-slate-200"
                      key="all-results"
                    >
                      <Link
                        href={`/search?q=${getValue()}`}
                        className="italic text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-gray-400"
                      >
                        See all results
                      </Link>
                    </li>
                    {results.map((result) => (
                      <li
                        className="m-0 px-2 py-1 hover:bg-slate-200"
                        key={result.id}
                      >
                        <Link
                          href={`/comic/${result.id}`}
                          className=" text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
                        >
                          {result.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};
