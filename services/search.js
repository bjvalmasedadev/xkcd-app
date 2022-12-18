import algoliasearch from "algoliasearch/lite";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch(APP_ID, API_KEY);

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
