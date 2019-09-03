const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contestSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    prize: {
      type: Number,
      required: true
    },
    images: [{ type: String, required: true }],
    status: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", contestSchema);
