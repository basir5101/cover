const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');


// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// import routes
const coverRoutes = require("./routes/CoverRoutes");



// use routes
app.use('/covers', coverRoutes)


app.get("/", (req, res) => {
    res.send("Route is working! YaY!!");
});



// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

