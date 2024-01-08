import express from "express";
import {
  createUser,
  /* deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote, */
} from "./controller.js";

const router = express.Router();

router.route("/").post(createUser);
//router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;