const express = require("express");
const router = express.Router();
const axios = require("axios");
const Reservation = require("../models/Reservation");
router.get("/locations", async (req, res) => {
  try {
    const q = JSON.stringify(req.query.q);
    if (q.length > 3) {
    }
    const response = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/locations?q=${q}
      `,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = response.data;

    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(error).json({ error: error.message });
  }
});

router.get("/rentaloffers", async (req, res) => {
  try {
    console.log(req.query);
    const pickupStation = req.query.pickupStation;
    const returnStation = req.query.returnStation;
    const pickupDate = req.query.pickupDate;
    const returnDate = req.query.returnDate;

    // const newReturnDate = returnDate.replace("%", " ");

    const response = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentaloffers?pickupStation=${pickupStation}&returnStation=${returnStation}&pickupDate=${pickupDate}&returnDate=${returnDate}
      `,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error).json({ error: error.message });
  }
});

router.post("/offerconfig", async (req, res) => {
  try {
    const offerId = req.body.offerId;
    console.log(req.body);

    const response = await axios.post(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
      { offerId: offerId },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error).json({ error: error.message });
  }
});

router.post("/personnaldetails", async (req, res) => {
  try {
    const {
      civility,
      society,
      firstname,
      lastname,
      email,
      street,
      country,
      dateOfBirthday,
      phone,
      zipCode,
      carDetails,
      endDate,
      startDate,
      cart,
      today,
      extraFees,
      total,
      dayOfLocation,
    } = req.body;
    console.log(req.body);

    const year = today.slice(2, 4);
    console.log("year", year);
    const month = today.slice(5, 7);
    console.log("month", month);

    const day = "0" + today.slice(8, 10);
    console.log("day", day);
    let shortname;
    if (lastname.length > 3) {
      shortname = lastname.slice(0, 3);
    } else shortname = lastname;
    const toUpperCaseShortName = shortname.toUpperCase();
    const resaNumber = toUpperCaseShortName + year + month + day;
    console.log("resa num ", resaNumber);

    if (
      civility &&
      firstname &&
      lastname &&
      email &&
      street &&
      country &&
      dateOfBirthday &&
      phone &&
      zipCode
    ) {
      const newReservation = new Reservation({
        civility: civility,
        society: society,
        firstname: firstname,
        lastname: lastname,
        email: email,
        street: street,
        country: country,
        dateOfBirthday: dateOfBirthday,
        phone: phone,
        zipCode: zipCode,
        carDetails: carDetails,
        cart: cart,
        extraFees: extraFees,
        endDate: endDate,
        startDate: startDate,
        today: today,
        total: total,
        resaNumber: resaNumber,
        dayOfLocation: dayOfLocation,
      });
      await newReservation.save();
      res.status(201).json({
        _id: newReservation._id,
        lastname: lastname,
        endDate: endDate,
        startDate: startDate,
        resaNumber: resaNumber,
      });
    } else {
      res.status(400).json({ message: "Missing parameters" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
