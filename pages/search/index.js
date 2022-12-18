import Layout from "components/Layout";
import { useI18N } from "context/i18n";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { search } from "services/search";

const Search = ({ query, results }) => {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query} `} />
      </Head>
      <Layout>
        <h1>{t("SEARCH_RESULTS_TITLE", results.length, query)}</h1>
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
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });

  // use algolia api to find the results

  return {
    props: {
      query: q,
      results,
    },
  };
}

export default Search;
