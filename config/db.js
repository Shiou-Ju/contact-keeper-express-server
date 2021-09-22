const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGO_URI");

const connectDB = () => {
  mongoose
    .connect(db)
    .then(() => {
      console.log("mongo連接成功");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

// useNewUrlParser:true
// useCreateIndex:true
// useFindAndModify:false

module.exports = connectDB;
