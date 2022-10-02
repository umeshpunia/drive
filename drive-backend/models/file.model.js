const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    parentFolder: {
      type: String,
    },
    status: {
      type: String,
      default: "true",
    },
    size: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", FileSchema);
