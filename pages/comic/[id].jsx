import Head from "next/head";
import React from "react";
import { Header } from "components/Header";
import Image from "next/image";
import Link from "next/link";
import { readFile, stat, readdir } from "fs/promises";
import path, { basename } from "path";

const Comic = ({
  id,
  img,
  alt,
  title,
  width,
  height,
  nextId,
  prevId,
  hasPrevious,
  hasNext,
}) => {
  return (
    <>
      <Head>
        <title>XKCD - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Header />
      <main>
        <section className="max-w-lg mx-auto">
          <h1 className="font-bold text-xl text-center mb-4">{title}</h1>
          <div className="max-w-xs m-auto mb-4">
            <Image
              className="max-w-full h-auto"
              width={width}
              height={height}
              src={img}
              alt={alt}
            />
          </div>
          <p>{alt}</p>
          <div className="flex justify-between font-bold">
            {hasPrevious && (
              <Link
                className="text-blue-500 hover:text-blue-800"
                href="/comic/[id]"
                as={`/comic/${prevId}`}
              >
                ⬅ Previous
              </Link>
            )}
            {hasNext && (
              <Link
                className="text-blue-500 hover:text-blue-800"
                href="/comic/[id]"
                as={`/comic/${nextId}`}
              >
                Next ➡
              </Link>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticPaths({ locales }) {
  const files = await readdir("./comics");
  let paths = [];

  locales.forEach((locale) => {
    paths = paths.concat(
      files.map((file) => {
        const fileName = basename(file, ".json");
        return { params: { id: fileName }, locale };
      })
    );
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf-8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId,
    },
  };
}
export default Comic;
