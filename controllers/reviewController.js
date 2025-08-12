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

const getReview = async () => {
  try {
    const review = await Review.findOne({ requestId: req.params.id})
  }
  catch (error) {

  }
}

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    // needs user validation check
    const deletedReview = await Review.findByIdAndDelete(id);

    res.send("Review deleted successfully");
  } catch (error) {
    console.log(error);
  }
};



module.exports = { createReview, getReview, deleteReview };
