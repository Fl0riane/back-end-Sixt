const express = require("express");
const router = express.Router();
const axios = require("axios");
const uid2 = require("uid2");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
router.post("/backoffice", async (req, res) => {
  console.log(req.body.password);
  const token = uid2(26);
  const passwordInput = req.body.password;
  try {
    if (passwordInput) {
      const loginUser = await User.find({ password: passwordInput });
      if (loginUser === null) {
        return res.status(401).json({ messsage: "erreur mot de passe" });
      } else res.status(200).json({ token: token });
    } else
      res.status(401).json({ messsage: "veuillez entrer un mot de passe" });
  } catch (error) {
    res.status(error).json({ error: error.message });
  }
});

router.get("/backoffice/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    count = await Reservation.countDocuments();
    res.json({
      reservations: reservations,
      count: count,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
