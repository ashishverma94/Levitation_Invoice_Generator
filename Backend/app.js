const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./middleware/error.js");
   
const app = express();

app.use(cors(  
  {
    origin:["https://levitation-invoice-generator.vercel.app"],
    credentials: true
  }
)); 
app.use(express.json());
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.end("Hello test!"); 
});  

// config 
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config(); 
}
// import routes
const user = require("./controller/user.js" );
const product = require("./controller/products.js");
const pdf = require("./controller/pdf.js") ;

app.use("/api/v2/user", user);
app.use("/api/v2/product", product);
app.use("/api/v2/data",pdf);


app.use(ErrorHandler) ;
module.exports = app;
