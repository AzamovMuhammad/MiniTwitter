const pool = require("../config/db");

exports.addUserPost = async (req, res) => {
  try {
    const { user_id, posttext } = req.body;
    let postFilePath;

    if (req.file && req.file.path) {
      postFilePath = req.file.path;
    }

    const newUserPost = await pool.query(
      `INSERT INTO posts (user_id, postText, postFilePath) VALUES ($1, $2, $3) RETURNING *`,
      [user_id, posttext, postFilePath]
    );

    res.status(201).json({
      message: "Yangi foydalanuvchi post qo'shildi.",
      post: newUserPost.rows[0],
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Serverda xatolik");
  }
};
