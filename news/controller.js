/*
 * Create news post
 * @route POST /news  
*/

import db_con from "../database/db_con.js";

export const createNews = async function(req, res){
    let {title, content, userId} = req.body;
    if(!title || !content){
        res.status(500).json({message: "post is missing values"})
    }

    let sql = "INSERT INTO news (title, content, user_id) VALUES(?,?,?)";
    await db_con.query(sql,[title, content, userId]);

    return res.status(200).json({message:"news post createtd"})
}