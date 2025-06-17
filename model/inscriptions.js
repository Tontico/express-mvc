const mongoose = require("mongoose");

const inscriptionsSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id_travel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Travel",
    required: true,
  },
  documents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],
  id_payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Inscription", inscriptionsSchema);
