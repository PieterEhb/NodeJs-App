import express from "express";
import { verifyUserToken } from "../users/verifyToken";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
  searchUser,
} from "./controller.js";

const userRouter = express.Router();

userRouter.route("/").get(verifyUserToken,getAllUsers).post(createUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/search").get(verifyUserToken,searchUser);
userRouter.route("/:id").get(verifyUserToken,getUser).put(verifyUserToken,updateUser).delete(verifyUserToken,deleteUser);


export default userRouter;