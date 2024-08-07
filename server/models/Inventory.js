const mongoose = require('mongoose')
const Schema = mongoose.Schema
// function generateVehicleId(brand,model,makeYear,sequenceNumber){
//     const baseId = `${brand}-${model}-${makeYear}-${sequenceNumber.toString().padStart(3,'0')}`;
//     const hash = 
// }
const inventorySchema = new mongoose.Schema({
    vehicleId:{
        type:String,
        unique:true
    },
    make:String,
    model:String,
    makeYear:Date,
    regYear:Date,
    vIn:String,//registration number only to be seen by employee
    //status of the vehicle
    status:{
        type:Boolean,
        default:false,//not sold initially
    },
    soldAt:{
        type:Date,
    },
    images:[{type:String}]

})

module.exports = mongoose.model('Inventory',inventorySchema)