const mongoose = require("mongoose");

const travelsSchema = new mongoose.Schema({
  end_date: {
    type: Date,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  depart: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  places: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "canceled"],
    default: "available",
  },
});

module.exports = mongoose.model("Travel", travelsSchema);
