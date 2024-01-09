import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNews,
  updateNews,
  searchNewsPost,
} from "./controller.js";

const newsRouter = express.Router();

newsRouter.route("/").get(getAllNews).post(createNews);
newsRouter.route("/search").get(searchNewsPost);
newsRouter.route("/:id").get(getNews).put(updateNews).delete(deleteNews);

export default newsRouter;