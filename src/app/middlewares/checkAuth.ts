import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/users/user.model";
import { envVars } from "../config/env";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new Error("No Token Received");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken?.email });

      if (!isUserExist) {
        throw new Error("User does not exist");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new Error("You ar not permitted to view this route!!!");
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log(error);
    }
  };