import Layout from "components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Search = ({ query, results }) => {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query} `} />
      </Head>
      <Layout>
        <h1>
          {results.length} Results for {query}
          {results.map((result) => {
            return (
              <Link
                key={result.id}
                href={`comic/${result.id}`}
                className="bg-slate-300 hover:bg-slate-50 flex flex-row justify-start content-center"
              >
                <Image
                  width="50"
                  src={result.img}
                  height="50"
                  className="rounded-full"
                  alt={result.alt}
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </Link>
            );
          })}
        </h1>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const results = await fetch("http://localhost:3000//api/search?q=" + q).then(
    (res) => res.json()
  );

  // use algolia api to find the results

  return {
    props: {
      query: q,
      results,
    },
  };
}

export default Search;
