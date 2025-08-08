const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const requestSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["plumbing", "electrical", "carpentry", "painting", "cleaning"],
      required: true,
    },
    description: { type: String, required: true },
    pay: { type: Number, required: true },
    status: { type: String, enum: ["active", "closed"] },
    appliedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Request", requestSchema)
