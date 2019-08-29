const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  contest: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
    required: true
  }
});

module.exports = mongoose.model("Submission", submissionSchema);
