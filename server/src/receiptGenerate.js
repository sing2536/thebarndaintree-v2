const fs = require('fs')
path = require('path')
const PDFDocument = require('pdfkit');
const moment = require('moment')

const receiptPath = path.join(__dirname, '..', 'uploads/receipts/')
const receiptSuffix = '.pdf'

function convertDate(date) {
    return moment(date).format('DD MMM YYYY')
}

function receiptGenerate(invoice, booking, paidTotal, property) {
    const doc = new PDFDocument({size: 'A4'});
    doc.pipe(fs.createWriteStream(receiptPath+invoice.id+receiptSuffix));

    //header
    doc.fontSize(24)
		.text(property.name, 50, 60)
		.fontSize(10)
		.text(`Business ID: ${property.businessId || ''}`, 50 ,60, {align: 'right'})
		.text(`Phone: ${property.phone || ''}`, 50 ,75, {align: 'right'})
		.text(`Email: ${property.email || ''}`, 50 ,90, {align: 'right'})

    doc.fontSize(20)
        .text(`Receipt`, 50, 170)
		.fontSize(10)
        .text(`Receipt Number:`, 50, 200)
        .text(invoice.id, 150, 200)
		.text(`Receipt Date:`, 50, 215)
		.text(`${convertDate(invoice.createdAt)}`, 150, 215)
		.text(`Amount Received:`, 50, 230)
		.text(`$${invoice.amountReceived}`, 150, 230)

		.text('Name:', 300, 200)
		.text(booking.name, 350, 200)
		.text('Mobile:', 300, 215)
		.text(booking.phone, 350, 215)
		.text('Email:', 300, 230,)
		.text(booking.email, 350, 230,)

    doc.font('Helvetica-Bold')
        .text('Item', 50, 300)
        // .text('Rate', 290, 300)
        .text('Amount', 50, 300, {align: 'right'})

    doc.moveTo(50, 318)
        .lineTo(524, 318)
        .lineWidth(0.6)
        .stroke();

    doc.font('Helvetica')
        .text(`Accomodation: ${convertDate(booking.checkIn)} - ${convertDate(booking.checkOut)}`, 50, 330)
        // .text(`Adults ${booking.adults || 0} Children ${booking.children || 0}`, 290, 330)
        .text(`$${booking.quote}`, 50, 330, {align: 'right'})

    doc.moveTo(50, 350)
        .lineTo(524, 350)
        .stroke();    

    doc.text('Subtotal', 400, 366)
        .text(`$${booking.quote}`, 50, 366, {align: 'right'})
        .text('Paid To Date', 400, 386)
        .text(`$${(paidTotal+parseFloat(invoice.amountReceived)).toFixed(2)}`, 50, 386, {align: 'right'})
        .font('Helvetica-Bold')
        .text('Balance Due', 400, 416)
        .text(`$${(booking.quote - paidTotal - parseFloat(invoice.amountReceived)).toFixed(2)}`, 50, 416, {align: 'right'})

    doc.end()
}

module.exports = { receiptGenerate, receiptPath, receiptSuffix } 