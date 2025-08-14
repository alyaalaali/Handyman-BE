const Review = require("../models/Review")
const Request = require("../models/Request")

const createReview = async (req, res) => {
  try {
    const { rating, description, requestId } = req.body
    const userId = res.locals.payload.id
    const numberRating = parseInt(rating)
    const request = await Request.findById(requestId)

    const review = await Review.create({
      rating: numberRating,
      description,
      requestId,
      userId,
      providerId: request.providerId,
    })
    res.send(review)
  } catch (error) {}
}

const getReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      requestId: req.params.requestId,
      userId: req.params.userId,
    })
    res.send(review)
  } catch (error) {}
}

// create GET request for all reviews for Provider
const getAllReviews = async (req, res) => {
  try {
    const { id } = req.params

    const reviews = await Review.find({ providerId: id }).populate({
      path: "requestId",
      select: "category",
    })
    res.send(reviews)
  } catch (error) {}
}

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params
    const userId = res.locals.payload.id
    // needs user validation check
    const review = await Review.findById(id)
    if (review.userId.toString() !== userId) {
      return res.send("cant delete this review")
    }
    const deletedReview = await Review.findByIdAndDelete(id)

    res.send(deletedReview, "Review deleted successfully")
  } catch (error) {}
}

module.exports = { createReview, getReview, getAllReviews, deleteReview }
