import axios from "axios";
import { ideaMenu } from "../keyboards/ideaMenu.js";
import { BASE_API_URL } from "../../env.js";

export const mainHandler = (bot) => {
  bot.hears("❕ Ma'lumot", async (ctx) => {
    ctx.session.prevPage = "info";
    const payloadName = ctx.session?.refId?.split("_")[0];
    const payloadId = ctx.session?.refId?.split("_")[1];

    try {
      if (payloadName == "info") {
        const data = await axios.get(`${BASE_API_URL}/info/one/${payloadId}`);

        if (data.data) {
          ctx.reply(
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
          `,
            {
              reply_markup: {
                keyboard: [["⬅️ Ortga"]],
                resize_keyboard: true,
              },
              parse_mode: "HTML",
            }
          );
        }
      }
    } catch (err) {
      ctx.reply("Ups! Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
    }
  });

  bot.hears("📑 Fikr-mulohaza", async (ctx) => {
    ctx.session.prevPage = "idea";

    ctx.reply("📑 Fikr-mulohaza", ideaMenu());
  });
};
