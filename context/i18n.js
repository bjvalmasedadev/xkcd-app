import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "../translations/es.json";
import en from "../translations/en.json";

const i18nContext = createContext();

const languages = { es, en };

export function I18NProvider({ children }) {
  const { locale } = useRouter();

  const t = useCallback(
    (key, ...args) => {
      let translation = languages[locale][key];
      if (args.length === 0) return translation;

      args.forEach(
        (value, index) =>
          (translation = translation.replace(`\${${index + 1}}`, value))
      );

      return translation;
    },
    [locale]
  );

  return <i18nContext.Provider value={{ t }}>{children}</i18nContext.Provider>;
}

export function useI18N() {
  const context = useContext(i18nContext);
  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider");
  }

  return context;
}
