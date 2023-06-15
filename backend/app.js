const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mainRouter = require("./routes/mainRouter");
const fileUpload = require("express-fileupload");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(fileUpload());


app.use("/", mainRouter);

const port = 3005;
app.listen(port, function () {
    console.log(`server started at port, ${port}`)
});