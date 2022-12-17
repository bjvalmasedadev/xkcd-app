// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import algoliasearch from "algoliasearch/lite";

const client = algoliasearch("4H9GINJ9Z8", process.env.ALGOLIA_API_KEY);

const index = client.initIndex("xkcd");

export default async function handler(req, res) {
  const { hits } = await index.search(req.query.q, {
    hitsPerPage: 10,
    attributesToRetrieve: ["id", "title", "img", "alt"],
  });
  return res.status(200).json(hits);
}
