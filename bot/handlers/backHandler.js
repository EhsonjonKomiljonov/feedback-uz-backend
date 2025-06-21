import { allInformationMenu } from "../keyboards/allInformationMenu.js";
import { mainMenu } from "../keyboards/mainMenu.js";

export const backHandler = (bot) => {
  const doBack = async (ctx) => {
    const prevPage = ctx.session.prevPage;
    // Agar inline tugma bo'lsa, loading spinner'ni to'xtatamiz
    if (ctx.callbackQuery) {
      await ctx.answerCbQuery();

      if(prevPage == 'organization') {
        await ctx.editMessageText("Quyidagi tashkilotlardan birini tanlang 👇", await allInformationMenu());
      }
      // Inline xabarni ham tahrirlash o'rniga o'chirish-ni xohlasangiz:
    }

    if (prevPage === "idea" || prevPage === "info") {
      ctx.session.prevPage = null;
      await ctx.reply("Quyidagi bo'limlardan birini tanlang 👇", mainMenu());
    }
  };

  bot.hears("⬅️ Ortga", doBack);
  bot.action("back", doBack);
};
