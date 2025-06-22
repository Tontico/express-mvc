const mongoose = require("mongoose");

const documentsSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id_registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["passport", "visa", "insurance", "other"],
    required: true,
  },
});
module.exports = mongoose.model("Document", documentsSchema);
