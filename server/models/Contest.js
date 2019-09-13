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
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "Submission"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

contestSchema.virtual("submissions", {
  ref: "Submission",
  localField: "_id",
  foreignField: "contest"
});

module.exports = mongoose.model("Contest", contestSchema);
