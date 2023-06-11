require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(process.env.MONGOOSE);

const clientsRoutes = require("./routes/clients");
app.use(clientsRoutes);
const adminRoutes = require("./routes/administration");
app.use(adminRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur Sixt ");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server started 🚀");
});
