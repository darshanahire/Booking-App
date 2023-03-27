const { Router } = require("express");
const mongodb = require('mongodb');
const router = Router();
const Customer = require("../models/Customer.model");
const Booking = require("../models/Booking.model");

require("../db/conn")


router.post("/getCustomers", async (req, res) => {
    let data = await Customer.find();
    res.status(200).json(data);
})

router.post("/createCustomer", async (req,res)=>{
    const {customerObj} = req.body;
    try{
        await Customer.create(customerObj).then((data)=>{
            res.status(200).json("Customer Created");
        })
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
})

router.post("/updateCustomer", async (req,res)=>{
    const {customerObj} = req.body;
    try{
        await Customer.findOneAndUpdate({ _id: customerObj._id }, customerObj).then((data)=>{
            res.status(200).json("Customer Updated");
        })
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
})

router.post("/deleteCustomer", async (req,res)=>{
    const {customerObj} = req.body;
    try{
        await Customer.findOneAndDelete({ _id: customerObj._id }).then((data)=>{
            res.status(200).json("Customer Deleted");
        })
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
})

router.post("/createBooking", async(req,res)=>{
    const {bookingDetails} = req.body;
    try {
        const newBooking = await Booking.create(bookingDetails);
        await Customer.findOneAndUpdate({ customerName:bookingDetails.bookedBy }, { $push: { bookings: newBooking._id } }, { new: true }).then((data) => {
            res.status(200).json(data.bookings)
        });
    }
    catch (err) {
        console.log(err);
        res.status(400)
    }
})

router.post("/updateBooking", async(req,res)=>{
    const {bookingDetails} = req.body;
    try{
        await Booking.findOneAndUpdate({ _id: bookingDetails._id }, bookingDetails).then((data)=>{
            res.status(200).json("Booking Updated");
        })
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
})

router.post("/readBooking", async(req,res)=>{
    const id = req.body.id;    
    try {
        await Booking.findOne({ _id: new mongodb.ObjectId(id) }).then(async (data) => {
            res.status(200).json(data);
        });
    }
    catch (err) {
        console.log(err);
        res.status(400)
    }
})

router.post("/deleteBooking", async (req, res) => {
    const {customerId,id} = req.body;
    console.log(customerId,id);
    
    try{
        await Customer.findOneAndUpdate({ _id: new mongodb.ObjectId(customerId)}, { $pull: { bookings: new mongodb.ObjectId(id) } }).then((data) => {
            res.status(200).json(data)
        });
    }
    catch(err){
        console.log(err);
        res.status(400);
    }
})

module.exports = router;