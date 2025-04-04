const pool = require("../config/db");
exports.likesCountComment = async (req, res) => {
  const { comment_id } = req.body;
  try {
    const likeCount = await pool.query(
      "SELECT COUNT(*) FROM commentLike WHERE comment_id = $1",
      [comment_id]
    );
    res.json({ like_count: likeCount.rows[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeComment = async (req, res) => {
  const { user_id, comment_id } = req.body;

  try {
    const likeCheck = await pool.query(
      "SELECT * FROM commentLike WHERE user_id = $1 AND comment_id = $2",
      [user_id, comment_id]
    );

    if (likeCheck.rowCount > 0) {
      await pool.query(
        "DELETE FROM commentLike WHERE user_id = $1 AND comment_id = $2",
        [user_id, comment_id]
      );
      res.json({ message: "Unlike qildingiz", liked: false });
    } else {
      await pool.query(
        "INSERT INTO commentLike (user_id, comment_id) VALUES ($1, $2)",
        [user_id, comment_id]
      );
      res.json({ message: "Like bosildi", liked: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLikeStatus = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { user_id } = req.query; // Frontenddan kelayotgan user_id

    if (!user_id || !comment_id) {
      return res
        .status(400)
        .json({ message: "User ID and Comment ID required" });
    }

    // Like bor yoki yo‘qligini tekshirish
    const result = await pool.query(
      "SELECT * FROM commentLike WHERE user_id = $1 AND comment_id = $2",
      [user_id, comment_id]
    );

    res.json({ liked: result.rows.length > 0 }); // Agar mavjud bo‘lsa, liked: true, bo‘lmasa false
  } catch (error) {
    console.error("Error fetching like status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
