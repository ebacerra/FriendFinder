console.log('loaded')
const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.static(path.join(__dirname, "/public")));
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});                             