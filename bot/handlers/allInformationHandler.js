import { allInformationMenu } from "../keyboards/allInformationMenu.js";
import { departmentMenu } from "../keyboards/departmentMenu.js";
import { useGet } from "../utils/useGet.js";

export const allInformationHandler = async (bot) => {
  bot.action(/^info_(\d+)$/, async (ctx) => {
    try {
      const id = ctx.match[1];
      ctx.session.infoId = `info_${id}`;
      ctx.session.prevPage = "information";

      const info = await useGet(`/info/filter?id=${id}`);

      if (info?.data) {
        await ctx.answerCbQuery();

        const getDepartments = await useGet(
          `/department/all?information_id=${info?.data?.id}`
        );

        if (getDepartments?.data?.length) {
          await ctx.editMessageText(
            "Quyidagi bo'limlardan birini tanlang 👇",
            await departmentMenu(info?.data?.id)
          );
        } else {
          await ctx.deleteMessage();

          await ctx.reply(
            "Hozircha bu organizatsiyaning bo'limlari mavjud emas"
          );

          await ctx.reply(
            "Quyidagi tashkilotlardan birini tanlang 👇",
            await allInformationMenu()
          );
        }
      } else {
        ctx.reply("Tashkilot topilmadi. Iltimos, tugmalardan birini tanlang.");
      }
    } catch (err) {
      ctx.reply(
        "Ups! Nimadur xatolik yuz berdi, iltimos qayta urinib ko'ring."
      );
    }
  });
};
