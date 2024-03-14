const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const puppeteer = require("puppeteer");

const router = express.Router();

// GET PRODUCTS
router.get(
  "/get-pdf",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      // await page.goto(`${process.env.FRONTEND_URL}/pic`);
      await page.goto(`https://levitation-invoice-generator.vercel.app/pic`);

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
      });
      await browser.close();

      res.set("Content-Type", "application/pdf");
      res
        .status(201)
        .send(Buffer.from(pdfBuffer, "binary"));

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
