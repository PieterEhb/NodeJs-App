import express from "express";
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

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/search").get(searchUser);
userRouter.route("/:id").get(getUser).put(updateUser).delete(deleteUser);


export default userRouter;