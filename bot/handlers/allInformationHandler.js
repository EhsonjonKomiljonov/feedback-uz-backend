import { useGet } from "../utils/useGet.js";

export const allInformationHandler = async (bot) => {
  bot.on("text", async (ctx) => {
    const text = ctx.message.text;

    const info = await useGet("/info/all");
    const found = info.data.find((i) => i.organization === text);

    if (found) {
      ctx.reply(`Siz tanlagan tashkilot: ${found.organization}`);
    } else {
      ctx.reply("Tashkilot topilmadi. Iltimos, tugmalardan birini tanlang.");
    }
  });
};
