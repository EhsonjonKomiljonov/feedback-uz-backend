import { allInformationMenu } from "../keyboards/allInformationMenu.js";
import { departmentMenu } from "../keyboards/departmentMenu.js";
import { mainMenu } from "../keyboards/mainMenu.js";

export const backHandler = (bot) => {
  const doBack = async (ctx) => {
    const prevPage = ctx.session.prevPage;
    
    // BACK ACTIONS FOR INLINE_KEYBOARD

    if (ctx.callbackQuery) {
      await ctx.answerCbQuery();

      if (prevPage == "information") {
        await ctx.editMessageText(
          "Quyidagi tashkilotlardan birini tanlang 👇",
          await allInformationMenu()
        );
      }

      if (prevPage == "department") {
        ctx.session.prevPage = "information";
        await ctx.editMessageText(
          "Quyidagi bo'limlardan birini tanlang 👇",
          await departmentMenu(ctx.session.infoId.split("_")[1])
        );
      }
    }

    // BACK ACTIONS FOR KEYBOARD

    if (prevPage === "idea" || prevPage === "info") {
      ctx.session.prevPage = null;
      await ctx.reply("Quyidagi bo'limlardan birini tanlang 👇", mainMenu());
    }
  };

  bot.hears("⬅️ Ortga", doBack);
  bot.action("back", doBack);
};
