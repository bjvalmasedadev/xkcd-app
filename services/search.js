import algoliasearch from "algoliasearch/lite";

const client = algoliasearch("4H9GINJ9Z8", process.env.ALGOLIA_API_KEY);

const index = client.initIndex("xkcd");

const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };

  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ["id", "title", "img", "alt"],
  });

  CACHE[query] = hits;
  return { results: hits };
};
