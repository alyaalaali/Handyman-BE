const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("review", reviewSchema)
