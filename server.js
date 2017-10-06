const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const path = require("path");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
const moment = require("moment");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/quote_dojo");

let QuoteSchema = new mongoose.Schema({
    name: {type:String, required:true, minlength:2},
    quote: {type:String, required:true, minlength:5}
}, {timestamps:true})
mongoose.model("Quote", QuoteSchema);
const Quote = mongoose.model("Quote");

app.get("/", (req, res) =>{

    res.render("index");
})
app.post("/quotes", (req, res) =>{
    let quote = Quote({name:req.body.name, quote:req.body.quote});
    quote.save((err) =>{
        if(err){
            console.log("something went wrong");
            res.render("index", {errors: quote.errors});
        } else{
            console.log("success");
            res.redirect("/quotes")
        }
    })
})

app.get("/quotes", (req, res) =>{
    Quote.find({}, (err, quote) =>{
        if(err){
            res.render("quotes", {errors:quote.errors});
        } else{
            console.log(quote)
            res.render("quotes", {quotes:quote, moment:moment});
        }
    })
})
app.listen(8000, ()=>{
    console.log("listening on port 8000")
})