import db_con from "../database/db_con.js";

async function lookupNews(id) {
  //let sql = "SELECT * FROM news WHERE id = ?"; for some reason the prepared statemnt is not working
  let sql = `select * from news where id = ${id.id}`;
  let [results] = await db_con.query(sql, [id]);
  return results[0];
};

export const createNews = async function (req, res) {
  let { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(500).json({ message: "post is missing values" });
  }

  let sql = "INSERT INTO news (title, content, user_id) VALUES(?,?,?)";
  await db_con.query(sql, [title, content, userId]);

  return res.status(200).json({ message: "news post created" });
};

export const getAllNews = async function (req, res) {
  let sql = "select * from news";
  let [results] = await db_con.query(sql);
  if (!results.lenght == 0)
    return res.status(204).json({ message: "empty list" });

  return res.status(200).json({ news: results });
};

export const getNews = async function (req, res) {
  let newsId = req.params;
  let news = await lookupNews(newsId);
  if (!news) return res.status(404).json({ message: "news post not found!" });
  return res.status(200).json(news);
};

export const updateNews = async function (req, res) {
  let newsId = req.params;
  let { title, content } = req.body;
  if (!title || !content || !newsId)
    return res.status(400).json({ message: "all fields are required" });
  let news = await lookupNews(newsId);
  if (!news) return res.status(404).json({ message: "news post not found!" });
  let sql = "UPDATE news SET title = ?, content = ? where id = ?";
  await db_con.query(sql, [title, content, userId]);
  return res.status(200).json({ message: "news has been updated" });
};

export const deleteNews = async function (req, res) {
  let newsId = req.params;
  if (!newsId)
    return res.status(400).json({ message: "all fields are required" });
  let news = await lookupNews(newsId);
  if (!news) return res.status(404).json({ message: "news post not found!" });

  let sql = "DELETE FROM news WHERE id = ?";
  await db_con.query(sql, [newsId]);

  return res.status(200).json({ message: "news post has been deleted" });
};
