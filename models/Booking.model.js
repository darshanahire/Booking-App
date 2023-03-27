

// Structure of Booking Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    bookedBy:{
        type:String,
        required: true
    },
    bookingId:{
        type: String,
        required: true,
    },
    loctionId:{
        type: String,
        required: true,
    },
    droneShotId:{
        type:String,
        required: true
    },
    droneHandlerName:{
        type:String,
    },
    eventTime:{
        type:Date,
    },
    createdTime:{
        type:Date,
        required: true
    }
})

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;