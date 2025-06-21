import { useGet } from "../utils/useGet.js";

export const allInformationMenu = async () => {
  const information = await useGet("/info/all");

  const buttons = information?.data?.map((item) => item.organization) || [];

  const keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) {
    keyboard.push(buttons.slice(i, i + 2));
  }

  return {
    reply_markup: {
      keyboard,
      resize_keyboard: true,
    },
  };
};
