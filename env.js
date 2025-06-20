import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const ACCESS_SECRET = process.env.ACCESS_SECRET_KEY;
export const REFRESH_SECRET = process.env.REFRESH_SECRET_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const BASE_API_URL = process.env.BASE_API_URL;
