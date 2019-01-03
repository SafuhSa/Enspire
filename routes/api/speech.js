const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Speech = require("../../models/Speech");

const User = require("../../models/User");
const keys = require('../../config/keys');

const validateSpeechInput = require("../../validation/speech");


// router.get("/:id", (req, res) => {
//   Speech.findById(req.params.id)
//     .then(Speech => res.json(Speech))
//     .catch(err =>
//       res.status(404).json({ notweetfound: "No Text found with that ID" })
//     );
// });

const NaturalLanguageUnderstandingV1 = require("watson-developer-cloud/natural-language-understanding/v1.js");
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateSpeechInput(req.body);

    const newSpeech = new Speech({
      user: req.user.id,
      transcript: req.body.transcript
    });

   

  newSpeech.save().then(Speech => res.json(Speech));
  });