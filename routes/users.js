const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("name", "名字為必填項目").not().isEmpty(),
    check("email", "請輸入有效的email").isEmail(),
    check("password", "請輸入超過由6位數字或英文組合成的密碼").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const isExistedUser = await User.findOne({ email });
      if (isExistedUser) {
        return res.status(400).json({ msg: "用戶已存在" });
      }

      const newUser = new User({ name, email });

      // generate salt based on rounds
      const salt = await bcrypt.genSalt(10);
      // add hashed password to newUser obj
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      // send token back for user to login
      const payload = {
        user: {
          id: newUser.id,
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
