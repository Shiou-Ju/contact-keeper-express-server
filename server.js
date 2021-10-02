const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

// Connection to mongo
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "歡迎來到聯絡人管理的API" });
});

// Init middleware
// If no body parser gets undefined
// extended:false => actually no use 
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/contacts',require('./routes/contacts'))

app.listen(PORT, () => {
  console.log(`伺服器在PORT ${PORT}啟動`);
});
