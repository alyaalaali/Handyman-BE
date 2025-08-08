const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const reviewSchema = new Schema(
  {
    Rating: { type: Number, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("review", reviewSchema)
