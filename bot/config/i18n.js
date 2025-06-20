import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// i18next ni boshlang
export async function initI18n() {
  if (!i18next.isInitialized) {
    await i18next
      .use(Backend)
      .init({
        fallbackLng: "uz",
        preload: ["uz", "ru"],
        backend: {
          loadPath: path.join(__dirname, "../locales/{{lng}}.json"),
        },
      });
  }
}

export function i18nMiddleware() {
  return async (ctx, next) => {
    const lang = ctx.session?.lang || ctx.from?.language_code || "uz";
    ctx.t = i18next.getFixedT(lang);
    await next();
  };
}
