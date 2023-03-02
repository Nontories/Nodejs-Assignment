const mongoose = require('mongoose');
const nationSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        unique: true
    },
    image:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }},
    {
        timestamps: true
    });
var Nations = mongoose.model('Nations', nationSchema);
module.exports = Nations;