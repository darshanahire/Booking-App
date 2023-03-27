//structure of customer Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customerName:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
    },
    phone:{
        type:String
    },
    location:{
        type:String
    },
    bookings:{
        type:Array
    }
})

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;