const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordDigest: { type: String },
    location: { type: String, required: true },
    Contact: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
