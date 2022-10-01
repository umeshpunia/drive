const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  parentFolder: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "true",
  },
});

module.exports = mongoose.model("folder", FolderSchema);
