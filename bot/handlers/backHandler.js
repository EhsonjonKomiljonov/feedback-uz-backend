import { mainMenu } from "../keyboards/mainMenu.js";

export const backHandler = (bot) => {
  bot.hears("⬅️ Ortga", async (ctx) => {
    const prevPage = ctx.session.prevPage;

    if (prevPage === "idea" || prevPage === "info") {
      ctx.session.prevPage = null;

      ctx.reply("Quyidagi bo'limlardan birini tanlang 👇", mainMenu());
    }
  });
};
