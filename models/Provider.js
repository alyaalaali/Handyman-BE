const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const providerSchema = new Schema(
  {
    CPR: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordDigest: { type: String },
    location: { type: String, required: true },
    Contact: { type: Number, required: true },
    profession: { type: String, required: true },
    categories: {
      type: [
        {
          type: String,
          required: true,
          enum: ["plumbing", "electrical", "carpentry", "painting", "cleaning"],
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
)

module.exports = mongoose.model("Provider", providerSchema)
