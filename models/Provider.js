const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const providerSchema = new Schema(
  {
    CPR: { type: Number, required: true, unique: true },
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    passwordDigest: { type: String },
    location: { type: String, required: true },
    contact: { type: Number, required: true },
    profession: { type: String, required: true },
    categories: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      default: [],
    },
    type: { type: String, default: "provider" },
  },

  { timestamps: true }
)

module.exports = mongoose.model("Provider", providerSchema)
