const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
   question:String,
   options:Array,
   correctAns:String 
})

const QuizModel = mongoose.model("quiz",quizSchema)
module.exports = QuizModel