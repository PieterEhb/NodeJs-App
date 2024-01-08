import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "./controller.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;