const express = require('express');
const app=  express();
app.use(express.json());
const Chatbot = require('../Models/chatbotModel.js');


exports.getQuestions = async(req,res)=>{
    try{
        const existingQuestion = await Chatbot.find();
        if(existingQuestion===0){
        const questions =[
            {question : "what is your name?"},
            {question : "what is your age?"},
            {question : "what is your favorite color?"}
        ];
        await Chatbot.insertMany(questions);
    }
        const word = req.query.question;
        const allQuestions = await Chatbot.find();
        const filteredQuestion = allQuestions.filter(q=>q.question.includes(word));
        return res.status(200).json(filteredQuestion);
    }catch(err){
        res.status(500).json(err);
    }
}
