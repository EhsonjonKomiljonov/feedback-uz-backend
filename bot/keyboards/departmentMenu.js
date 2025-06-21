import { useGet } from "../utils/useGet.js";
import { backMenu } from "./backMenu.js";

export const departmentMenu = async (info_id) => {
  const getDepartments = await useGet(
    `/department/all?information_id=${info_id}`
  );

  const buttons =
    getDepartments?.data?.map((item) => ({
      text: item.name,
      callback_data: `dep_${item.id}`,
    })) || [];

  const inline_keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) {
    inline_keyboard.push(buttons.slice(i, i + 2));
  }

  return {
    reply_markup: {
      inline_keyboard: [
        ...inline_keyboard,
        backMenu(),
      ],
      resize_keyboard: true,
    },
  };
};
