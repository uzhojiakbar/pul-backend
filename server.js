const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.js");

const app = express();
app.use(cors());
app.use(express.json());

// Router
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PUL backend</title>

        <style>
          body{
            background-color: black;
            color:white;
          }
        </style>
      </head>
      <body>
        <center>
          <h1>Pul backend server running</h1>
        </center>
        <br><br><br>
      </body>
    </html>
    `);
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDBga muvaffaqiyatli ulandi"))
  .catch((err) => console.error("MongoDBga ulanishda xatolik:", err));

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishga tushdi`));
