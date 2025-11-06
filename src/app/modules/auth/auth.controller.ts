import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";

const credentialsLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    console.log(loginInfo);

    res.cookie("accessToken", loginInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.status(httpStatus.OK).json({
      success: true,
      message: "User Logged in successfully!",
      user: loginInfo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const AuthControllers = {
  credentialsLogin,
};