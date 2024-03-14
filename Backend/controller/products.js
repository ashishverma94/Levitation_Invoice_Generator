const express = require("express");
const Product = require("../model/product.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken.js");

const router = express.Router();

//  CREATE PRODUCT
router.post("/add-product", async (req, res, next) => {
  try {
    const { prodName, prodQty, prodRate } = req.body;
    console.log(prodName, prodQty, prodRate);

    const newProd = await Product.create({
      name: prodName,
      qty: prodQty,
      rate: prodRate,
    });

    res.status(200).json({
      product: newProd,
      message: "Product added successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// GET PRODUCTS
router.get(
  "/get-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allProducts = await Product.find();
      res.status(200).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
