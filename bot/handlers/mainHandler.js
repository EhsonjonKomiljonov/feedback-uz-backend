import axios from "axios";
import { ideaMenu } from "../keyboards/ideaMenu.js";
import { BASE_API_URL } from "../../env.js";
import { backMenu } from "../keyboards/backMenu.js";
import { allInformationMenu } from "../keyboards/allInformationMenu.js";

export const mainHandler = (bot) => {
  bot.action("about_info", async (ctx) => {
    ctx.session.prevPage = "information";
    const payloadName = ctx.session?.refId?.split("_")[0];
    const payloadId = ctx.session?.refId?.split("_")[1];
    const infoId = ctx.session.infoId;

    try {
      if (payloadName == "info" || infoId.includes("info")) {
        const data = await axios.get(
          `${BASE_API_URL}/info/one/${payloadId || infoId.split("_")[1]}`
        );

        if (data.data) {
          await ctx.answerCbQuery();

          await ctx.deleteMessage()

          await ctx.reply(
            `${data?.data?.organization}
Viloyat: ${data?.data?.location}
Shahar: ${data?.data?.city_uz}
Manzil: ${data?.data?.address}
Telefon: ${data?.data?.phone}
${data?.data?.telegram ? `Telegram: ${data?.data?.telegram}` : ""}
${data?.data?.instagram ? `Instagram: ${data?.data?.instagram}` : ""}
${data?.data?.wi_fi ? `Telegram: ${data?.data?.wi_fi}` : ""}
${
  data?.data?.description_uz
    ? `Izoh: ${data?.data?.[`description_${ctx.session.lang}`]}`
    : ""
}
          `
          );

          await ctx.reply("Quyidagi bo'limlardan birini tanlang 👇", await allInformationMenu());
        }
      }
    } catch (err) {
      ctx.reply("Ups! Xatolik yuz berdi, iltimos qayta urinib ko'ring /start");
    }
  });

  bot.hears("📑 Fikr-mulohaza", async (ctx) => {
    ctx.session.prevPage = "idea";

    ctx.reply("📑 Fikr-mulohaza", ideaMenu());
  });
};
