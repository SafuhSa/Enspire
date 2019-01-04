// const Validator = require("validator");
// const validText = require("./valid-text");

// module.exports = function validateTextInput(data) {
//   let errors = {};

//   // data.text = validText(data.text) ? data.text : "";

//   // if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
//   //   errors.text = "Tweet must be between 5 and 140 characters";
//   // }

//   // if (Validator.isEmpty(data.text)) {
//   if (Validator.isEmpty(data)) {
//     errors.text = "No errors field is required";
//   }

//   return {
//     errors,
//     isValid: Object.keys(errors).length === 0
//   };
// };
