const mongoose = require("mongoose");

const documentsSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Document", documentsSchema);
