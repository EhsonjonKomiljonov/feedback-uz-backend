import { allInformationMenu } from "../keyboards/allInformationMenu.js";
import { useGet } from "../utils/useGet.js";

export const allInformationHandler = async (bot) => {
  bot.action(/^org_(\d+)$/, async (ctx) => {
    const id = ctx.match[1];
    ctx.session.prevPage = "organization";

    const info = await useGet(`/info/filter?id=${id}`);

    if (info?.data) {
      await ctx.answerCbQuery();
      const getDepartments = await useGet(
        `/department/all?information_id=${info?.data?.id}`
      );

      if (getDepartments?.data?.length) {
        // SETTING DEPARTMENTS BUTTONS
        const buttons =
          getDepartments?.data?.map((item) => ({
            text: item.name,
            callback_data: `dep_${item.id}`,
          })) || [];

        const inline_keyboard = [];
        for (let i = 0; i < buttons.length; i += 2) {
          inline_keyboard.push(buttons.slice(i, i + 2));
        }

        await ctx.editMessageText(info?.data?.organization, {
          reply_markup: {
            inline_keyboard: [...inline_keyboard, [{ text: "⬅️ Ortga", callback_data: 'back' }]],
            resize_keyboard: true,
          },
        });
      } else {
        await ctx.deleteMessage();

        await ctx.reply("Hozircha bu organizatsiyaning bo'limlari mavjud emas");

        await ctx.reply(
          "Quyidagi tashkilotlardan birini tanlang 👇",
          await allInformationMenu()
        );
      }
    } else {
      ctx.reply("Tashkilot topilmadi. Iltimos, tugmalardan birini tanlang.");
    }
  });
};
