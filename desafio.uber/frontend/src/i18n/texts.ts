type TextKeys =
  | "title"
  | "subtitle"
  | "searchPlaceholder"
  | "realtime"
  | "copyright";

type Language = "pt" | "en";

export const texts: Record<Language, Record<TextKeys, string>> = {
  pt: {
    title: "Transporte Público",
    subtitle: "Encontre informações sobre transporte público próximo a você",
    searchPlaceholder: "Digite o nome da rua, avenida ou local...",
    realtime: "Informações de transporte público em tempo real",
    copyright:
      "© 2026 – Desenvolvido por Fernando Vieira Goya. Todos os direitos reservados."
  },
  en: {
    title: "Public Transport",
    subtitle: "Find information about public transport near you",
    searchPlaceholder: "Enter the name of a street, avenue, or location...",
    realtime: "Real-time public transport information",
    copyright:
      "© 2026 – Developed by Fernando Vieira Goya. All rights reserved."
  }
};
