const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Speech = require("../../models/Speech");

const User = require("../../models/User");
const keys = require('../../config/keys');

const validateSpeechInput = require("../../validation/speech");

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateSpeechInput(req.body);
    // console.log(req)
    const newSpeech = new Speech({
      user: req.user._id,
      text: req.body.text
    });
 

  newSpeech.save().then(Speech => res.json(Speech.text));
  });

router.get('/user/:user_id', (req, res) => {
  Speech.find({ user: req.params.user_id })
    .then(Speech => res.json(Speech))
    .catch(err =>
      res.status(404).json({ notweetsfound: 'No Speech found from that user' }
      )
    );
});

module.exports = router;