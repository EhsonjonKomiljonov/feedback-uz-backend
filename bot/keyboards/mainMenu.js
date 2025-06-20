export const mainMenu = () => {
  return {
    reply_markup: {
      keyboard: [
        [
          { text: "❕ Ma'lumot", callback_data: "info" },
          { text: "📑 Fikr-mulohaza", callback_data: "feedback" },
        ],
      ],
      resize_keyboard: true,
    },
  };
};
