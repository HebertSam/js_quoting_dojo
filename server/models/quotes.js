const mongoose = require("mongoose");

let QuoteSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:2},
    quote: {type:String, required:true, minlength:5}
}, {timestamps:true})
mongoose.model("Quote", QuoteSchema);
const Quote = mongoose.model("Quote");
