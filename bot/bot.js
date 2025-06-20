import { BOT_TOKEN } from "../env.js";
import { Scenes, session, Telegraf } from "telegraf";
import { registerHandlers } from "./handlers/index.js";
import {  initI18n, i18nMiddleware } from "./config/i18n.js";
import registerScenes from "./scenes/index.js";

export const bot = new Telegraf(BOT_TOKEN);

await initI18n()

bot.use(session());

const stage = new Scenes.Stage(registerScenes());

// MIDDLEWARES
bot.use(stage.middleware());
bot.use(i18nMiddleware());

// HANDLERS
registerHandlers(bot);

bot.launch();
console.log("-------------- ✅ Bot started working! -----------------------");
