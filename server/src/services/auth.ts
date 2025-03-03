import { UserRepo } from "../repository/auth";
import bcrypt from "bcrypt";
import type { SignInSchema, UserSchema } from "../schema/user";
import {
  createJsonWebToken,
  hashPassword,
  verifyPasswordHash,
  ZentioError,
} from "../utils/utils";

type AuthReturn = {
  username: string;
  name: string;
  token: string;
};

export const createUser = async (data: UserSchema): Promise<AuthReturn> => {
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
  const hashedPassword = await hashPassword(data.password);
  const res = await UserRepo.createUser({
    ...data,
    password: hashedPassword,
  });
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

export const signInUser = async (data: SignInSchema): Promise<AuthReturn> => {
  const { email, password } = data;

  // checking if the user exists or not
  const user = await UserRepo.getUserByEmail(email);
  if (!user) {
    throw new ZentioError(`no account registered with this email`, 404);
  }

  // checking password hash
  const verified = await verifyPasswordHash(user?.passwordHash, password);
  console.log(verified);
  if (!verified) {
    throw new ZentioError(`invalid credentials`, 401);
  }

  // user is verified, generating token
  const token = createJsonWebToken({
    username: user.username,
    name: user.name,
    id: user.id,
  });

  return {
    token,
    username: user.username,
    name: user.email,
  };
};

export const updatePassword = async (data: SignInSchema): Promise<void> => {
  const { email, password } = data;

  // checking if the user exists or not
  const user = await UserRepo.getUserByEmail(email);
  if (!user) {
    throw new ZentioError(`no account registered with ${email}`, 404);
  }

  // checking password hash
  const verified = verifyPasswordHash(user?.passwordHash, password);
  if (!verified) {
    throw new ZentioError(`invalid credentials`, 401);
  }

  const hashedPassword = await hashPassword(password);
  const updatedUser = await UserRepo.updatePassword(email, hashedPassword);
  if (!updatedUser) {
    throw new ZentioError(`faild to update password`, 401);
  }
};
