export const ideaMenu = () => ({
  reply_markup: {
    keyboard: [
      [{ text: "⭐️ Bizni ishimizni baxolang" }],
      [{ text: "📝 Sizning fikringiz" }, { text: "👍 Sizning taklifingiz" }],
      [
        { text: "👎 Sizning shikoyatingiz" },
        {
          text: "👥 Xodimlarni baxolash",
          callback_data: "review_employee",
        },
      ],
      [{ text: "⬅️ Ortga" }],
    ],
    resize_keyboard: true,
  },
});
