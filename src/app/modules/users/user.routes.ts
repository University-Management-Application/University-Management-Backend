import { Router } from "express";
// import { checkAuth } from "../../middlewares/checkAuth";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
// import { Role } from "./user.interface";

const router = Router();

//create user
router.post("/register", UserControllers.createUser);
//get all users
router.get("/all-users", checkAuth(Role.ADMIN), UserControllers.getAllUsers);
//get single user
router.get("/:id", UserControllers.singleUser);
//updated single user
router.put("/:id", UserControllers.singleUserUpdate);
//delete single user
router.delete("/:id", UserControllers.singleUserDelete);

export const UserRoutes = router;

//  checkAuth(Role.ADMIN),