const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get("/", (req, res) => {
  //TODO: use middleware to get the id of the user
  res.send("get logged user");
});

//@route    POST api/auth
//@desc     Auth user and get token
//@access   Public
router.post(
  "/",
  [
    check("email", "請輸入有效的email").isEmail(),
    check("password", "請輸入密碼").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "無效的資訊" });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return res.status(400).json({ msg: "無效的資訊" });
      }

      // send token back
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("JWT_SECRET"),
        {
          expiresIn: 3600, // expires in one hour
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("伺服器錯誤，請稍候再試");
    }
  }
);

module.exports = router;
