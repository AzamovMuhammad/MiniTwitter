const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { fullname, username, profilepath, password } = req.body;
    const userExists = await pool.query(
      `select * from users where username = $1`,
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Username already exsist" });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `insert into users (fullname, username, profilepath, password) VALUES ($1,$2,$3,$4) RETURNING*`,
      [fullname, username, profilepath, encryptedPassword]
    );
    res.status(201).json({
      message: "Yangi foydalanuvchi qo'shildi.",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi.");
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 limit 1",
      [username]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Incorrect username or password" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "MEN SENGA BIR GAP AYTAMAN, HECH KIM BILMASIN",
      { expiresIn: "1h" }
    );
    res.json({ user, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi.");
  }
};
