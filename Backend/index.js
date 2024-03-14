const myApp =  require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config  
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
     path: "config/.env",
  });  
}  
 
// connect db
connectDatabase() ;

// create server
const server = myApp.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});  


