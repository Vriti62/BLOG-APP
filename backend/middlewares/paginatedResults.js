const express = require('express');
const app = express();
app.use(express.json());

exports.paginationResults= (model)=> {
    return async (req,res,next)=>{
        //pagination
        const page = parseInt(req.query.page); //without parsing- its being passed as a string !!
        const limit = parseInt(req.query.limit);

        const startIndex = (page-1)*limit; //cause array- indexes start from 0
        const endIndex = page*limit; //end of our array

        const results = {};

        const totalEntries = await model.countDocuments();
        if(endIndex<totalEntries){
            results.next = {
                page:page+1, //want to pass the next page
                limit:limit
            }
        }

        //if startIndex would be less than 0, there's no previous so if the condition is true- previous doesnt come along in response 
        if(startIndex>0){
            results.previous = {
                page:page-1, //want to pass the next page
                limit:limit
            }
        }
       
        results.results = await model.find().limit(limit).skip(startIndex); //skip to startIndex if its 2 or some

        res.paginationResults = results;
        next();
    }
}

