import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const url = process.env.DB_URL;

if (!url) {
   throw new Error("Postgres db enviorment variable is not defined");
}

export default defineConfig({
   dialect: "postgresql",
   casing: "snake_case",
   out: "./src/db/migrations",
   schema: ["./src/db/schema/*"],
   dbCredentials: {
      url,
   },
});
