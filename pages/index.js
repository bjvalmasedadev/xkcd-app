import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Footer from "components/Footer";
import { Header } from "../components/Header";

import fs from "node:fs/promises";
import Layout from "components/Layout";
import { useI18N } from "context/i18n";

export default function Home({ latestComics }) {
  const { t } = useI18N();
  console.log(t("LATESTS_COMICS"));
  return (
    <>
      <Head>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("LATEST_COMICS")}
        </h2>
        <section className="grid grid-cols-1 gap-4 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => (
            <Link
              key={comic.id}
              href={`comic/${comic.id}`}
              className="mb-4 pb-4 mx-auto"
            >
              <h3 className="font-bold text-sm text-center pb-2">
                {comic.safe_title}
              </h3>
              <Image
                className="aspect-square"
                style={{ objectFit: "contain" }}
                width={comic.width}
                height={comic.height}
                src={comic.img}
                alt={comic.alt}
              />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const files = await fs.readdir("./comics");
  const latestComicsFiles = files.slice(-8, files.length);

  const promiseReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf-8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promiseReadFiles);
  return {
    props: {
      latestComics,
    },
  };
}
