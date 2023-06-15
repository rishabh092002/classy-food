const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expSession = require("express-session");
const mainRouter = require("./Router/mainRouter");
const fileUplode = require("express-fileupload");
const cookieParser = require("cookie-parser");


app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expSession({
    secret: "classy-foodhsgyge5",
    resave: false,
    saveUninitialized: false
}));
app.use(fileUplode());
app.use(cookieParser());


app.use("/", mainRouter);

const port = 3001;
app.listen(port,function(){
    console.log(`server started at port ,${port}`);
})