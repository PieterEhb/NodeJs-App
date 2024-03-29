import joi from 'joi';
import db_con from "../database/db_con.js";
import { tryCatchWrapper } from "../middleware/tryCarchWrapper.js";
import {
  createNewsValidation,
  updateNewsValidation
} from "./newsValidation.js";

/**
 * @description Looks up news on id returns news object
 */

async function lookupNews(id) {
  let sql = "SELECT * FROM news WHERE id = ?";
  let [results] = await db_con.query(sql,[id]);
  return results[0];
};

/**
 * @description Create news post
 * @route POST /news
 */

export const createNews = tryCatchWrapper(async function (req, res) {
  try{
    let validation = joi.assert(req.body, createNewsValidation, {abortEarly: false});
  }
  catch(err){
    return res.status(400).json(err.details);
  }
  let { title, content, userId } = req.body;
  let sql = "INSERT INTO news (title, content, user_id) VALUES(?,?,?)";
  await db_con.query(sql, [title, content, userId]);

  return res.status(200).json({ message: "news post created" });
});

/**
 * @description Get All news posts
 * @route GET /news
 */

export const getAllNews = tryCatchWrapper(async function (req, res) {
  let sql = "select * from news";
  let [results] = await db_con.query(sql);
  if (!results.lenght == 0)
    return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ news: results });
});

/**
 * @description Get Single news post
 * @route GET /news/:id
 */

export const getNews = tryCatchWrapper(async function (req, res) {
  let newsId = parseInt(req.params.id);
  let news = await lookupNews(newsId);
  if (!news) return res.status(404).json({ message: "news post not found!" });
  return res.status(200).json(news);
});

/**
 * @description Update news post
 * @route PUT /news/:id
 */

export const updateNews = tryCatchWrapper(async function (req, res) {
  try{
    let validation = joi.assert(req.body, updateNewsValidation, {abortEarly: false});
  }
  catch(err){
    return res.status(400).json(err.details);
  }
  let newsId = parseInt(req.params.id);
  let { title, content } = req.body;
  let news = await lookupNews(newsId);
  if (!news) return res.status(404).json({ message: "news post not found!" });
  let sql = "UPDATE news SET title = ?, content = ? , updated_at = ? where id = ?";
  let date = new Date();
  await db_con.query(sql, [title, content, date.toISOString().slice(0, 19).replace('T', ' '), newsId]);
  return res.status(200).json({ message: "news has been updated" });
});

/**
 * @description Delete news, can be only done if admin
 * @route DELETE /news/:id
 */

export const deleteNews = tryCatchWrapper(async function (req, res) {
  let newsId = parseInt(req.params.id);
  if (!newsId)
    return res.status(400).json({ message: "all fields are required" });
  let news = await lookupNews(newsId);
  if (!news) return res.status(404).json({ message: "news post not found!" });

  let sql = "DELETE FROM news WHERE id = ?";
  await db_con.query(sql, [newsId]);

  return res.status(200).json({ message: "news post has been deleted" });
});

/**
 * @description Get news on title
 * @route GET /news/search
 */

export const searchNewsPost = tryCatchWrapper(async function(req, res){
  let {title, limit, offset} = req.query;
  let sql;
  let querryVariables;
  //let filter = req.query;
  if(!limit || !offset){
    sql = "select * from news where title like CONCAT('%',?,'%')";
    querryVariables = [title];
  }else{
    sql = "select * from news where title like CONCAT('%',?,'%') LIMIT ? OFFSET ?";
    querryVariables = [title, parseInt(limit), parseInt(offset)];
  }
  let [results]  = await db_con.query(sql, querryVariables)
  if(results.length == 0) return res.status(204).json({message: "empty list"});
  return res.status(200).json({news: results})
});