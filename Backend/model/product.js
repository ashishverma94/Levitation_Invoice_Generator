const mongoose = require('mongoose') ;

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        qty:{
            type:Number,
            required:true,
        },
        rate:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Product", productSchema);
