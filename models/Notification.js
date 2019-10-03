const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    message: { type: String, required: true },
    read: {
      type: Boolean,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    notifOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    link: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
