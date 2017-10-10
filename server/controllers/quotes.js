const mongoose = require("mongoose");
const Quote = mongoose.model("Quote");
module.exports = {
        show: function(req, res){
            Quote.find({}, (err, quote) =>{
            if(err){
                res.render("quotes", {errors:quote.errors});
            } else{
                console.log(quote)
                res.render("quotes", {quotes:quote, moment:moment});
            }
        })
    },
    create: function(req, res){   
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
    }  
}