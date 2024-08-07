const mongoose = require('mongoose')
const Schema=mongoose.Schema

const leadSchema= new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:String,
    email:{
        type:String,
        unique:true,
        required:[true,"email required"]
    },
    password:{
        type:String,
        required:[true,"password required"]

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:['new','contacted','converted','reject']
    }
})

const Lead = new mongoose.model('Lead',leadSchema)

module.exports=Lead 