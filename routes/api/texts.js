const axios = require("axios");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Text = require("../../models/Text");
// const validateTweetInput = require("../../validation/tweets");


router.post("/grammar", async (req, res) => {
  let apiResponse;
  apiResponse = await axios.get("https://api.textgears.com/check.php", {
    params: {
      key: "tZuTzrp9oTpUo2f6",
      text: req.body.text
    }
  })

  let grammarErrors = apiResponse.data.errors;
  if (grammarErrors.length > 0) {
    newText = new Text({
      user: req.user.id,
      wrongtext: req.body.text,
      correcttext: grammarErrors
    });
    newText.save().then(text => res.json(text))
  }
});

module.exports = router;