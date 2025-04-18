const pool = require("../config/db");
exports.likesCount = async (req, res) => {
  const { images_id } = req.body;
  try {
    const likeCount = await pool.query(
      "SELECT COUNT(*) FROM postsLikes WHERE post_id = $1",
      [images_id]
    );
    res.json({ like_count: likeCount.rows[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeCond = async (req, res) => {
  const { user_id, images_id } = req.body;

  try {
    // Foydalanuvchi allaqachon like bosganmi?
    const likeCheck = await pool.query(
      "SELECT * FROM postsLikes WHERE user_id = $1 AND post_id = $2",
      [user_id, images_id]
    );

    if (likeCheck.rowCount > 0) {
      // Agar like bosgan bo‘lsa, o‘chiramiz (Unlike)
      await pool.query(
        "DELETE FROM postsLikes WHERE user_id = $1 AND post_id = $2",
        [user_id, images_id]
      );
      res.json({ message: "Unlike qildingiz", liked: false });
    } else {
      // Agar like bosmagan bo‘lsa, qo‘shamiz
      await pool.query(
        "INSERT INTO postsLikes (user_id, post_id) VALUES ($1, $2)",
        [user_id, images_id]
      );
      res.json({ message: "Like bosildi", liked: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLikeStatus = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { user_id } = req.query; // Frontenddan kelayotgan user_id

    if (!user_id || !post_id) {
      return res.status(400).json({ message: "User ID and Post ID required" });
    }

    // Like bor yoki yo‘qligini tekshirish
    const result = await pool.query(
      "SELECT * FROM postslikes WHERE user_id = $1 AND post_id = $2",
      [user_id, post_id]
    );

    res.json({ liked: result.rows.length > 0 }); // Agar mavjud bo‘lsa, liked: true, bo‘lmasa false
  } catch (error) {
    console.error("Error fetching like status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
