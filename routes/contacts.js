const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const verifyUserToken = require("../middleware/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");

//@route    GET api/contacts
//@desc     Get all user's contacts
//@access   Private
router.get("/", verifyUserToken, async (req, res) => {
  const userId = req.user.id;
  const validateUserInDb = await User.findById(userId);
  if (!validateUserInDb) {
    res.status(401).send("無此用戶");
  }

  try {
    const contacts = await Contact.find({ user: userId }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("伺服器錯誤");
  }
});

//@route    POST api/contacts/
//@desc     Add new contact
//@access   Private
router.post(
  "/",
  [[verifyUserToken, check("name", "姓名為必填項目").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.array().length) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const savedContact = await newContact.save();
      res.json(savedContact);
    } catch (error) {
      console.error(error);
      res.status(500).send("伺服器錯誤，請稍候再試");
    }
  }
);

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
router.put("/:id", verifyUserToken, async (req, res) => {
  const { name, email, phone, type } = req.body;
  // build new contact obj
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let targetContact = await Contact.findById(req.params.id);

    if (!targetContact) {
      return res.status(404).json({ msg: "此ID沒有對應到的聯絡人項目" });
    }

    if (targetContact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "沒有權限更改此聯絡人" });
    }

    targetContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } // if not found then create
    );

    return res.json(targetContact);
  } catch (error) {
    console.error(error);
    res.status(500).send("伺服器錯誤，請稍候再試");
  }
});

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", verifyUserToken, async (req, res) => {
  try {
    let targetContact = await Contact.findById(req.params.id);

    if (!targetContact) {
      return res.status(404).json({ msg: "此ID沒有對應到的聯絡人項目" });
    }

    if (targetContact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "沒有權限更改此聯絡人" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    return res.json({ msg: "聯絡人已被刪除" });
  } catch (error) {
    console.error(error);
    res.status(500).send("伺服器錯誤，請稍候再試");
  }
});

module.exports = router;
