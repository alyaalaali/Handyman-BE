const Review = require("../models/Review");
const Request = require("../models/Request");

const createReview = async (req, res) => {
  try {
    console.log(req.body);
    const { rating, description, requestId } = req.body;
    const userId = res.locals.payload.id;
    const numberRating = parseInt(rating);
    // needs to get the userID from token
    const review = await Review.create({
      rating: numberRating,
      description,
      requestId,
      userId,
    });
    res.send(review);
  } catch (error) {
    console.log(error);
  }
};

const getReview = async (req, res) => {
  try {
    const review = await Review.find({ requestId: req.params.id})
    res.send(review)
  }
  catch (error) {
    console.log(error, "Can't get an review")
  }
}

// create GET request for all reviews for Provider
const getAllReviews = async (req, res) => {
  try {
    const { providerId } = req.params

  const reviews = await Review.find({ providerId })
  res.send(reviews) 

} catch (error) {
  console.log(error, "Error for getting the reviews")
}
}


const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    // needs user validation check
    const deletedReview = await Review.findByIdAndDelete(id);

    res.send(deletedReview ,"Review deleted successfully");
  } catch (error) {
    console.log(error);
  }
};



module.exports = { createReview, getReview, getAllReviews, deleteReview };
