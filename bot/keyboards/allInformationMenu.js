import { useGet } from "../utils/useGet.js";

export const allInformationMenu = async () => {
  const information = await useGet("/info/all");

  const buttons =
    information?.data?.map((item) => ({
      text: item.organization,
      callback_data: `info_${item.id}`,
    })) || [];

  const inline_keyboard = [];

  for (let i = 0; i < buttons.length; i += 2) {
    inline_keyboard.push(buttons.slice(i, i + 2));
  }

  return {
    reply_markup: {
      inline_keyboard,
      resize_keyboard: true,
    },
  };
};
