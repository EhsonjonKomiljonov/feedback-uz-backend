import i18next from "i18next";
import { mainMenu } from "../keyboards/mainMenu.js";
import { allInformationMenu } from "../keyboards/allInformationMenu.js";

export const languageHandler = (bot) => {
  bot.action(/^lang_(.+)/, async (ctx) => {
    const payload = ctx.session.refId;
    ctx.session.lang = await ctx.match[1];

    await ctx.answerCbQuery();

    ctx.t = i18next.getFixedT(ctx.match[1]);

    // await ctx.deleteMessage();

    await ctx.editMessageText(`${ctx.match[1] == 'uz' ? "🇺🇿 O'zbek tili tanlandi" : "🇷🇺 Русский язык выбран"}`);

    await ctx.reply(
      payload != "start"
        ? ctx.t("after_lang")
        : "Quyidagi tashkilotlardan birini tanlang 👇",
      payload != "start" ? mainMenu() : await allInformationMenu()
    );
  });
};
