
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from "./dictionaries";

export type Lang = "en" | "ru" | "kk";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k: string) => k,
});

const LS_KEY = "kazai_lang";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LS_KEY) as Lang | null;
      if (saved && ["en","ru","kk"].includes(saved)) return saved;
      // detect browser
      const nav = navigator?.language?.toLowerCase() || "";
      if (nav.startsWith("ru")) return "ru";
      if (nav.startsWith("kk") || nav.includes("kz")) return "kk" as Lang;

    }
    return "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LS_KEY, l); } catch {}
  };

  const t = useMemo(() => {
    const dict = dictionaries[lang] || {};
    return (key: string) => {
      return (dict as any)[key] || (dictionaries["en"] as any)[key] || key;
    };
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
