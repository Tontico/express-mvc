const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    required: true,
  },
});
module.exports = mongoose.model("Payment", paymentsSchema);
