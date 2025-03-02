import { UserRepo } from "../repository/auth";
import type { UserSchema } from "../schema/user";
import { createJsonWebToken, ZentioError } from "../utils/utils";

type CreateReturnType = {
  username: string;
  name: string;
  token: string;
};

export const createUser = async (
  data: UserSchema,
): Promise<CreateReturnType> => {
  //checking if the user exists or not
  const existingUserWithUsernamePromise = UserRepo.getUserByUsername(
    data.username,
  );
  const existingUserWithEmailPromise = UserRepo.getUserByEmail(data.email);

  const [existingUserWithUsername, existingUserWithEmail] = await Promise.all([
    existingUserWithUsernamePromise,
    existingUserWithEmailPromise,
  ]);

  if (existingUserWithUsername) {
    throw new ZentioError(`user with ${data.username} already exists`, 409);
  }
  if (existingUserWithEmail) {
    throw new ZentioError(`user with ${data.username} already exists`, 409);
  }

  //creating user
  const res = await UserRepo.createUser(data);
  if (!res) {
    throw new ZentioError(`Failed to create user`, 500);
  }

  const token = createJsonWebToken({
    username: res.username,
    name: res.name,
    id: res.id,
  });

  return {
    token,
    username: res.username,
    name: res.email,
  };
};
