import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

//create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("User", req.body);
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//get all user
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUsers();
  console.log(result);

  res.status(httpStatus.OK).json({
    success: true,
    message: "All Users Retrieved Successfully",
    data: result,
  });
};

//get single user
const singleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await UserServices.singleUser(id);
    res.status(httpStatus.OK).json({
      success: true,
      message: "single user received successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//get single user updated
const singleUserUpdate = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id, req.body);
  const result = await UserServices.singleUserUpdate(id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: "single User Updated successfully",
    data: result,
  });
};

//single user deleted
const singleUserDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.singleUserDelete(id);
  console.log("result", result);

  res.status(httpStatus.OK).json({
    success: true,
    message: "single user deleted successfully",
    data: result,
  });
};

//export all function
export const UserControllers = {
  createUser,
  singleUser,
  getAllUsers,
  singleUserUpdate,
  singleUserDelete,
};