import { app } from "./app.js";
import { BOT_TOKEN, PORT } from "./env.js";
import "./bot/bot.js";
import { bot } from "./bot/bot.js";

app.listen(PORT || 8080, () => {
  console.log(
    `-------------- ✅ Server is running on port ${PORT} -------------`
  );

  if (BOT_TOKEN) {
    bot.launch();
    console.log(
      "-------------- ✅ Bot started working! -----------------------"
    );
  }
});
