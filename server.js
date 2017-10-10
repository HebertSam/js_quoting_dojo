const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const path = require("path");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
const moment = require("moment");

require("./server/config/mongoose.js");

const routes_setter = require("./server/config/routes.js");
routes_setter(app);

app.listen(8000, ()=>{
    console.log("listening on port 8000")
})