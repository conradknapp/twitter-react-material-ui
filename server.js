const express = require("express");
const bodyParser = require("body-parser");
const twitter = require("./routes/api/twitter");
require("dotenv").config({ path: "variables.env" });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", twitter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
