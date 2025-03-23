const pool = require("../config/db");
exports.commentPost = async (req, res) => {
  try {
    const { user_id, post_id, comment } = req.body;
    const commentPostMessage = await pool.query(
      `insert into comments(user_id, post_id, comment) values ($1, $2, $3)RETURNING *`,
      [user_id, post_id, comment]
    );
    res.status(200).json(commentPostMessage.rows[0])
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Serverda xatolik");
  }
};

exports.getComments = async(req, res) => {
    try {
        const getUserComments = await pool.query(
            `select * from comments where post`
        )
    } catch (error) {
        
    }
}
