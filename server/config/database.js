const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  if (process.env.NODE_ENV === "development") {
    console.log("Successful connection to the MongoDB database");
  }
  console.log("Successful connection to the MongoDB database");
});
