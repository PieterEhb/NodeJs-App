import express from "express";
import { verifyAdminToken } from "../users/verifyToken";
import {
  createNews,
  deleteNews,
  getAllNews,
  getNews,
  updateNews,
  searchNewsPost,
} from "./controller.js";

const newsRouter = express.Router();

newsRouter.route("/").get(getAllNews).post(verifyAdminToken,createNews);
newsRouter.route("/search").get(searchNewsPost);
newsRouter.route("/:id").get(getNews).put(verifyAdminToken, updateNews).delete(verifyAdminToken,deleteNews);

export default newsRouter;