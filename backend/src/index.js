const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");

//parse:- for convting json data to js object
app.use(express.json());
app.use(cookieParser());

main()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Server listening at port Number: " + process.env.PORT);
    });
  })
  .catch((err) => console.log("error occure: " + err));
