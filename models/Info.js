const mongoose = require('mongoose')

 const infoSchema = new mongoose.Schema({
    s:String,
    score:Number,
    f:String
 })

 const InfoModel = mongoose.model("info",infoSchema)
 module.exports = InfoModel