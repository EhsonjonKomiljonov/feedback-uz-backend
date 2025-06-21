import { languageMenu } from "../keyboards/languageMenu.js";

export const startCommand = (bot) => {
  bot.start((ctx) => {
    const payload = ctx.startPayload;

    if (payload) {
      ctx.session.refId = payload;
    } else {
      ctx.session.refId = "start";
    }

    ctx.reply(
      `Assalomu alaykum! 
✅ FeedbackUz ning rasmiy botiga xush kelibsiz`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

    ctx.reply("Tilni tanlang 👇", languageMenu());
  });
};
