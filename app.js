
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
const session = require("express-session");
const path = require("path")
const app = express();

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on("connected", connected => {
    console.log("connection to database....")
})
mongoose.connection.on("err", error => {
    console.log("err")

})
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


////Express static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/admin", (req, res) => {
    res.render("admin")
})
//routes call
const adminrouter = require("./routes/admin")
app.use("/", adminrouter)

app.listen(2000, () => {
    console.log("localhost://2000")
})