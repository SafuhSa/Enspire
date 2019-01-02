const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpeechSchema = new Schema({
    User:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:string,
        req:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = Speech = mongoose.model("speech",SpeechSchema)