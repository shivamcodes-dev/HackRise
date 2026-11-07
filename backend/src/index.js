const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth"); //Shivam
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit");
const aiRouter = require("../src/routes/aiChatting");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//parse:- for convting json data to js object
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter); // Shivam Raj
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);
app.use("/ai", aiRouter);

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
