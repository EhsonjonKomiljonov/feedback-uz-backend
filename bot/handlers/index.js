import { startCommand } from "../commands/start.js";
import { mainHandler } from "./mainHandler.js";
import { languageHandler } from "./languageHandler.js"; 
import { backHandler } from "./backHandler.js";
import { allInformationHandler } from "./allInformationHandler.js";

export function registerHandlers(bot) {
  startCommand(bot);
  languageHandler(bot);
  mainHandler(bot)
  backHandler(bot)
  allInformationHandler(bot)
}
