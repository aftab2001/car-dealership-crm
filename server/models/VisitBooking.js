const mongoose = require('mongoose')

const visitbookingSchema = new mongoose.Schema({
    bookingDate:Date,
    customer:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    agent:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    vehicleBooked:{
        type:Schema.Types.ObjectId,
        required:true
    }
})

module.exports = mongoose.model('VisitBooking',visitbookingSchema)