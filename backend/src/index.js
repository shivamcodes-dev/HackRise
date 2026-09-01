const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth"); //Shivam
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problemCreator");

//parse:- for convting json data to js object
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter); // Shivam
app.use("/problem", problemRouter);

const InitalizeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server listening at port Number: " + process.env.PORT);
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};

InitalizeConnection();

// main()
//   .then(async () => {
//     app.listen(process.env.PORT, () => {
//       console.log("Server listening at port Number: " + process.env.PORT);
//     });
//   })
//   .catch((err) => console.log("error occure: " + err));
