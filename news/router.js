import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNews,
  updateNews,
} from "./controller.js";

const router = express.Router();

router.route("/").get(getAllNews).post(createNews);
router.route("/:id").get(getNews).put(updateNews).delete(deleteNews);

export default router;