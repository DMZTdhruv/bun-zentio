import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../db";
import { UserTable } from "../db/schema";
import type { UserSchema } from "../schema/user";

export namespace UserRepo {
  export type Model = InferSelectModel<typeof UserTable>;
  export type Data = InferSelectModel<typeof UserTable>;

  export const createUser = async (
    data: UserSchema,
  ): Promise<Model | undefined> => {
    const { name, username, password, email } = data;
    return (
      await db
        .insert(UserTable)
        .values({
          email,
          password_hash: password,
          name,
          username,
        })
        .returning()
    )[0];
  };

  export const getUserByEmail = async (
    email: string,
  ): Promise<Model | undefined> => {
    return (
      await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, email))
        .limit(1)
    )[0];
  };

  export const getUserByUsername = async (
    username: string,
  ): Promise<Model | undefined> => {
    return (
      await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.username, username))
        .limit(1)
    )[0];
  };

  export const getUserById = async (id: string): Promise<Model | undefined> => {
    return (
      await db.select().from(UserTable).where(eq(UserTable.id, id)).limit(1)
    )[0];
  };

  export const updatePassword = async (
    email: string,
    password: string,
  ): Promise<Model | undefined> => {
    return (
      await db
        .update(UserTable)
        .set({ password_hash: password })
        .where(eq(UserTable.email, email))
        .returning()
    )[0];
  };
}
