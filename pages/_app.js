import { NextUIProvider } from "@nextui-org/react";
import { I18NProvider, useI18N } from "context/i18n";
import Head from "next/head";
import "../styles/globals.css";

const DefaultHead = () => {
  const { t } = useI18N();
  return (
    <Head>
      <title>{t("SEO_DEFAULT_TITLE")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <I18NProvider>
      <NextUIProvider>
        <DefaultHead />
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NProvider>
  );
}

export default MyApp;
