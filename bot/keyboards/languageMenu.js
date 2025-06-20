export const languageMenu = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🇺🇿 O‘zbek", callback_data: "lang_uz" }],
        [{ text: "🇷🇺 Русский", callback_data: "lang_ru" }],
      ],
    },
  };
};
