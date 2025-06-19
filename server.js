import { app } from "./app.js";
import dotenv from "dotenv";
import { NODE_ENV, PORT } from "./env.js";

if (NODE_ENV !== "production") {
  dotenv.config();
}

app.listen(PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
