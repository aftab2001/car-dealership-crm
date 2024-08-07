const mongoose = require('mongoose')
const Schema=mongoose.Schema
const Customer = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:String,
    email:{
        type:String,
        required:true,
    },
    password:{type:String,required:true},
    agent:{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    },
    visit:{
        type:Schema.Types.ObjectId,
        ref:"VisitBooking"
    }

})