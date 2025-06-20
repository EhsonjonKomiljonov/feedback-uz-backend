import { app } from "./app.js";
import { PORT } from "./env.js";
import "./bot/bot.js";

app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
