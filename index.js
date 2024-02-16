const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const RegisterModel = require('./models/Register');
const InfoModel = require('./models/Info');
const QuizModel = require('./models/Quiz');
app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Quiz",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.post('/signup',(req,res)=>{
    RegisterModel.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
})

app.post('/addquestion',(req,res)=>{
    QuizModel.create(req.body)
    .then(quiz=>res.json(quiz))
    .catch(err=>res.json(err))
})

app.get('/scorelist',(req,res)=>{
    InfoModel.find({})
    .then(info=>res.json(info))
    .catch(err=>res.json(err))
})

app.get('/quiz',(req,res)=>{
    QuizModel.find({})
    .then(quiz=>res.json(quiz))
    .catch(err=>res.json(err))
})

app.post('/quiz',(req,res)=>{
    InfoModel.create(req.body)
    .then(info=>res.json(info))
    .catch(err=>res.json(err))
})

app.delete('/quiz/:id', (req, res) => {
    const { id } = req.params;
    QuizModel.findByIdAndDelete(id)
      .then(() => res.json({ message: 'Question deleted successfully' }))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  

app.get('/',(req,res)=>{
    RegisterModel.find({})
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("Server Running")
})