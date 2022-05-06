const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

// request of content type applicaction json
app.use(bodyParser.json());

// request of content type application/x-www-form-urlcoded
app.use(bodyParser.urlencoded({ extended: true }));

// cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Payout Api ." });
});

require("./app/routes/payoutReport.route")(app);

// set port listing for request
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})