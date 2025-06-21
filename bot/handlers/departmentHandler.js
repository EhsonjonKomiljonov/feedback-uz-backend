import { mainMenu } from "../keyboards/mainMenu.js";
import { useGet } from "../utils/useGet.js";

export const departmentHandler = (bot) => {
  bot.action(/^dep_(\d+)$/, async (ctx) => {
    const id = ctx.match[1];
    ctx.session.prevPage = "department";

    const getDepartment = await useGet(`/department/filter?id=${id}`);

    if (getDepartment?.data) {
      await ctx.answerCbQuery();

      await ctx.editMessageText(`${getDepartment?.data?.name} bo'limiga xush kelibsiz`, mainMenu());
    }
  });
}