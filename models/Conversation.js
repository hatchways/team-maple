const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: function (value) {
          return this.user1 !== value;
        },
        message: "Users must be different people",
      },
    },
    user1Read: {
      type: Boolean,
      required: true,
    },
    user2Read: {
      type: Boolean,
      required: true,
    },
  },
  { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

conversationSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversation",
});

module.exports = mongoose.model("Conversation", conversationSchema);
