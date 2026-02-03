import { useContext } from "react";
import { LanguageContext } from "../context/Language.tsx";

export default function LanguageButton() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      {language === "pt" ? "🇺🇸 English" : "🇧🇷 Português"}
    </button>
  );
}
