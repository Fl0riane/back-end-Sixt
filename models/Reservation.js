const mongoose = require("mongoose");

const Reservation = mongoose.model("Reservation", {
  civility: { type: String, required: true },
  society: { type: String },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  street: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirthday: { type: Date, required: true },
  phone: { type: String, required: true },
  zipCode: { type: String, required: true },
  carDetails: { type: Object },
  extraFees: { type: Object },
  cart: { type: Object },
  startDate: { type: Object },
  endDate: { type: Object },
  total: { type: Number },
  today: { type: Object },
  resaNumber: { type: String },
  dayOfLocation: { type: Number },
  // id: { type: String, unique: true, required: true },
});
module.exports = Reservation;
