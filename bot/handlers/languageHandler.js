import i18next from "i18next";
import { mainMenu } from "../keyboards/mainMenu.js";

export const languageHandler = (bot) => {
  bot.action(/^lang_(.+)/, async (ctx) => {
    const payload = ctx.session.refId;
    ctx.session.lang = await ctx.match[1];

    await ctx.answerCbQuery();

    ctx.t = i18next.getFixedT(ctx.match[1]);

    ctx.reply(ctx.t("after_lang"), payload ? mainMenu() : {});
  });
};
