import { Scenes } from "telegraf";

export const registerScenes = new Scenes.WizardScene(
  "register",
  (ctx) => {
    ctx.reply("Ismingizni kiriting:");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.name = ctx.message.text;
    ctx.reply("Yoshingizni kiriting:");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.age = ctx.message.text;
    ctx.reply(
      `Rahmat, ${ctx.wizard.state.data.name}, ${ctx.wizard.state.data.age} yoshdasiz.`
    );
    return ctx.scene.leave();
  }
);

export default function () {
  return [registerScenes];
}
