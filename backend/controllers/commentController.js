const pool = require("../config/db");
exports.commentPost = async (req, res) => {
  try {
    const { user_id, post_id, comment } = req.body;
    const commentPostMessage = await pool.query(
      `insert into comments(user_id, post_id, comment) values ($1, $2, $3) RETURNING *`,
      [user_id, post_id, comment]
    );
    res.status(200).json(commentPostMessage.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Serverda xatolik");
  }
};

exports.getComments = async (req, res) => {
  try {
    const { post_id } = req.body;
    const getUserComments = await pool.query(
        `SELECT 
        users.id AS user_id,
        posts.id AS post_id,
        users.profilepath,
        users.username,
        comments.comment,
        comments.id
    FROM users
    INNER JOIN comments ON users.id = comments.user_id
    INNER JOIN posts ON posts.id = comments.post_id
    WHERE posts.id = $1`, [post_id]
    );
    res.status(200).json(getUserComments.rows)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Serverda xatolik");
  }
};
