const pool = require("../config/db");

exports.userFavPost = async (req, res) => {
  const { user_id } = req.body;
  try {
    const userFavPostResult = await pool.query(
      `
                SELECT 
                    postslikes.id, 
                    postslikes.user_id,
                    users.id,
                    users.fullname, 
                    users.username, 
                    users.profilepath,
                    posts.id AS post_id, 
                    posts.postfilepath,
                    posts.posttext
                FROM postslikes
                INNER JOIN posts ON postslikes.post_id = posts.id
                INNER JOIN users ON posts.user_id = users.id
                where postslikes.user_id = $1;
            `,
      [user_id]
    );
    if (userFavPostResult.rows.length != 0) {
      const photos = userFavPostResult.rows.map((photo) => {
        return { ...photo, url: `http://localhost:4200/` + photo.postfilepath };
      });
      return res.json(photos);
    } else {
      return res.json({ message: "serverda hatolik" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
