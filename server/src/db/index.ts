import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const url = process.env.DB_URL;

if (!url) {
   throw new Error("Postgres db enviorment variable is not defined");
}

export const client = new Client({
   connectionString: url,
   ssl: false,
});

export const connectToDb = async () => {
   try {
      console.log("connecting to db");
      await client.connect();
      console.log("connected to db");
   } catch (error) {
      console.log("failed to connect to db");
   }
};

export const db = drizzle(client);
