import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNews,
  updateNews,
} from "./controller.js";

const newsRouter = express.Router();

newsRouter.route("/").get(getAllNews).post(createNews);
newsRouter.route("/:id").get(getNews).put(updateNews).delete(deleteNews);

export default newsRouter;