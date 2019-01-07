const axios = require("axios");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Text = require("../../models/Text");


router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  let apiResponse;
  let errors = {};

  if (!req.body.text){
    errors.text = "Text field is empty";
    return res.status(400).json(errors);
  }

  apiResponse = await axios.get("https://api.textgears.com/check.php", {
    params: {
      key: "tZuTzrp9oTpUo2f6",
      text: req.body.text
    }
  });
  let grammarErrors;

  if (apiResponse.data.result) {
    grammarErrors = apiResponse.data.errors;
  } else {
    errors.text = apiResponse.data.description;
    return res.status(400).json(errors)
  }

  if (grammarErrors.length > 0) {
    newText = new Text({
      user: req.user.id,
      wrongtext: req.body.text,
      correcttext: grammarErrors
    });
   return newText.save().then(text => res.json(text))
  } else {
    errors.text = "No Errs Found!! good job!";
   return res.status(400).json(errors);
  } 
});


router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {

  Text.find({ user: req.user.id })
    .then(texts => res.json(texts))
    .catch(err =>
      res.status(404).json({ notextsfound: "No Record found from that user" })
    );
});

module.exports = router;