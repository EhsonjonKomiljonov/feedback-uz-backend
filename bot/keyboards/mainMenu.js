export const mainMenu = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "❕ Ma'lumot", callback_data: "about_info" },
          { text: "📑 Fikr-mulohaza", callback_data: "feedback" },
        ],
        [{ text: "⬅️ Ortga", callback_data: "back" }],
      ],
      resize_keyboard: true,
    },
  };
};
