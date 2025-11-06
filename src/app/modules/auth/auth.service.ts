import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Pick<IUser, "email" | "passwordHash">) => {
  const { email, passwordHash } = payload;

  // check user existence
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new Error("User not found");
  }

  // compare password
  const isPasswordMatched = await bcrypt.compare(
    passwordHash,
    isUserExist.passwordHash
  );

  if (!isPasswordMatched) {
    throw new Error("Incorrect password");
  }

  // JWT payload
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // generate access token
  const accessToken = jwt.sign(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    {
      expiresIn: envVars.JWT_ACCESS_EXPIRES,
    } as SignOptions
  );

  // return token and user info
  return {
    accessToken,
    user: {
      _id: isUserExist._id,
      name: isUserExist.name,
      email: isUserExist.email,
      role: isUserExist.role,
    },
  };
};

export const AuthServices = {
  credentialsLogin,
};
