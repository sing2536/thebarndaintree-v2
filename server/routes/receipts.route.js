const db = require("../models");
const router = require("express").Router();
const fs = require('fs')
const auth = require('../middleware/auth')
const { receiptGenerate, receiptPath, receiptSuffix } = require('../src/receiptGenerate')
const Bookings = db.bookings
const Receipts = db.receipts
const hasBookings = require('../middleware/hasBookings')
const hasReceipts = require('../middleware/hasReceipts');
const demoRestrict = require("../middleware/demoRestrict");

module.exports = app => {
    router.get("/", hasReceipts, async (req, res) => {
        const receipt = req.receipt

        res.download(receiptPath+receipt.id+receiptSuffix, 'The Barn Daintree receipt '+(new Date(receipt.createdAt).getTime()/1000).toFixed(0)+receiptSuffix)
    })

    router.get("/view/", hasReceipts, async (req, res) => {
        const receipt = req.receipt
        
        fs.readFile(receiptPath+receipt.id+receiptSuffix, (err, data) => {
            res.set({
              "Content-Type": "application/pdf",
              "Content-Disposition": "inline; filename=" + 'The Barn Daintree receipt '+(new Date(receipt.createdAt).getTime()/1000).toFixed(0)+receiptSuffix, //if you change from inline to attachment if forces the file to download but inline displays the file on the browser
            });
            res.send(data);
            });
    })

    router.post("/:id", demoRestrict, hasBookings, async (req, res, next) => {
        try {
            const booking = await Bookings.findOne({where: {id: req.params.id}, include: [Receipts]})
            const property = await booking.getProperty()
    
            let paidTotal = 0
            for (let i of booking.receipts) paidTotal = paidTotal+parseFloat(i.amountReceived)
    
            if ((paidTotal+parseFloat(req.body.amountReceived)) < 0) return next("Total amount cannot be less than zero.")
            if ((paidTotal+parseFloat(req.body.amountReceived)) > booking.quote) return next("Total amount cannot exceed quote.")
            const receipt = await booking.createReceipt(req.body)
            receiptGenerate(receipt, booking, paidTotal, property)
            res.send(receipt)
        } catch(err) {
            next(err)
        }
    })

    app.use('/receipts', auth, router);
};