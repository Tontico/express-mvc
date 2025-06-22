const mongoose = require("mongoose");

const registrationsSchema = new mongoose.Schema({
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
    enum: ["pending", "documents_uploaded", "confirmed", "canceled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Registration", registrationsSchema);
