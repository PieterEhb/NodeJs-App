import express from "express";
import {
  createNews,
/*   deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote, */
} from "./controller.js";

const router = express.Router();

router.route("/").post(createNews);
//router.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);

export default router;