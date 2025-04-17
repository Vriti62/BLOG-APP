const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatbotSchema = new Schema({
    questions:{
        type: Array,
        required: true,   
    }
});

module.exports = mongoose.model('chatbot', chatbotSchema);

