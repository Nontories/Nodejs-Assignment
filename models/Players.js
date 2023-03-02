const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema({
        name:{
            type: String,
            require:true,
            unique: true
        },
        image:{
            type: String,
            require: true
        },
        club:{
            type:String,
            require:true
        },
        position:{
            type:String,
            require:true
        },
        goals:{
            type:Number,
            require:true
        },
        isCaptain:{
            type:Boolean,
            require:true
        }
    },
    {
        timestamps: true
    });
var Players = mongoose.model('Players', playerSchema);
module.exports = Players;