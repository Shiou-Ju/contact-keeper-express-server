const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Connection to mongo
connectDB();

const PORT = process.env.PORT || 5000;

// Init parser
app.use(express.json());

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static files in prodiction
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // direct any routes to the index.html except the ones above
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`伺服器在PORT ${PORT}啟動`);
});
