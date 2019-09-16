import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    profileUrl: {
        type: String,
    },
    customerId: {
        type: String,
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

UserSchema.virtual("submissions", {
    ref: "Submission",
    localField: "_id",
    foreignField: "creator"
});

UserSchema.virtual("contests", {
    ref: "Contest",
    localField: "_id",
    foreignField: "creator",
});

module.exports = mongoose.model("User", UserSchema);