const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users-routes");
const storiesRoutes = require("./routes/stories-routes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
var ip = require("ip");

// routermäärittelyt tänne

/*
const cors = require('cors');
app.use(cors());
*/

const app = express();
app.use(bodyParser.json());

//Sallitaan cors pyynnöt front-endistä

// parse requests of content-type - application/x-www-form-urlencoded

app.use(cors({}));

app.use("/api/users", usersRoutes);

app.use("/api/stories", storiesRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .send({ message: error.message || "Unknown error" });
});

const uri =
  "mongodb+srv://dbuser:" +
  process.env.REACT_PASSWORD +
  "@cluster0.kkexnr0.mongodb.net/MernDB?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () =>
      console.log("API is running on " + ip.address() + ":5000/")
    );
  })
  .catch((err) => {
    console.log(err);
  });
