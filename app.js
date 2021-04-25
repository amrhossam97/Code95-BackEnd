const express = require("express");
const app = express();

// Connect to the MongoDB cluster
const mongoose = require("mongoose");
const mongoAtlasUri =
  "mongodb+srv://Amrhossam:kingmora+90@cluster0.ehiqb.mongodb.net/Code95?retryWrites=true&w=majority";
try {
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

//Controllers
const UserController = require("./controllers/UserController");
UserController(app);


//error middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(422).send({ err: err.message });
});
app.listen(port, () => console.log("server started at port "+ port ));
