const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    passwordDigest: { type: String },
    location: { type: String, required: true },
    contact: { type: Number, required: true },
    type: { type: String, default: "user" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
