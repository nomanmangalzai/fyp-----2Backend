const express = require("express");
const res = require("express/lib/response");
const order = require("../models/order");
const orderSchema = require("../models/order");
const ordersReportSchema = require("../models/ordersReport");
const mongoose = require("mongoose");

const ImageModel = require("../models/product");

//below we import PDFDocument library
const PDFDocument = require("pdfkit");
const doc = new PDFDocument();
const fs = require("fs");

exports.getOrdersReport = async (req, res, next) => {
  console.log("The getOrdersReport API has been called");

  try {
    await generateSalesReportPDF(res);
  } catch (error) {
    console.error("Error generating sales report:", error);
    res
      .status(500)
      .send("An error occurred while generating the sales report.");
  }
};

//below we have the report generation function
// Assuming the SalesReport model has the necessary schema and required fields

async function generateSalesReportPDF(res) {
  try {
    // Fetch sales report data from the database
    const salesData = await ordersReportSchema.find();

    // Create a new PDF document
    const doc = new PDFDocument();

    // Add content to the PDF
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("Sales Report", { align: "center" })
      .moveDown(0.5);

    // Loop through salesData and add details to the PDF
    salesData.forEach((sales) => {
      doc.font("Helvetica").fontSize(12).text(`Order ID: ${sales.orderID}`);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Customer Name: ${sales.customerName}`);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Purchase Date: ${sales.purchaseDate}`);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Total Amount: ${sales.totalAmount}`);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Payment Method: ${sales.paymentMethod}`);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Order Status: ${sales.orderStatus}`);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Shipping Address: ${sales.shippingAddress}`);

      doc.moveDown(1);
    });

    // Finalize the PDF document
    doc.end();

    // Convert the PDF document to a buffer
    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      // Save the sales report in MongoDB
      const salesReport = new ordersReportSchema({
        orderID: "ORD123",
        customerName: "John Doe",
        purchaseDate: new Date(),
        totalAmount: 100.0,
        paymentMethod: "Credit Card",
        orderStatus: "Completed",
        shippingAddress: "123 Main St, City, Country",
        report: pdfBuffer,
      });
      await salesReport.save();

      // Set the response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="sales_report.pdf"'
      );

      // Send the sales report as the response
      res.send(pdfBuffer);
    });

    console.log("Sales report generated successfully.");
  } catch (error) {
    console.error("Error generating sales report:", error);
  }
}

exports.stockOutOfStockItems = async (req, res, next) => {
  try {
    console.log("stock out of stock API called.");

    const outOfStockCount = await ImageModel.countDocuments({ stock: 0 });
    const inStockCount = await ImageModel.countDocuments({ stock: { $gt: 0 } });

    res.json({
      outOfStock: outOfStockCount,
      inStock: inStockCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.ordersPerWeek = async (req, res, next) => {
  console.log("orderPerWeek API called");
  //
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date four weeks ago
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    // Group the orders by week using the purchaseDate field and filter for the last four weeks
    const ordersPerWeek = await ordersReportSchema.aggregate([
      {
        $match: {
          purchaseDate: {
            $gte: fourWeeksAgo,
            $lte: currentDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $week: "$purchaseDate",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Add week numbers to the JSON response
    const response = ordersPerWeek.map((week) => ({
      week: `Week ${week._id}`,
      orders: week.count,
    }));

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }

  //
};
