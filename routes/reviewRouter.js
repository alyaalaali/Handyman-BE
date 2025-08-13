const router = require("express").Router()
const controller = require("../controllers/reviewController")
const { stripToken, verifyToken } = require('../middleware/index')

router.post("/new", stripToken, verifyToken, controller.createReview)
router.get('/:id', stripToken, verifyToken, controller.getReview )
router.get('/reviews', stripToken, verifyToken, controller.getAllReviews)
router.delete("/:id", stripToken, verifyToken , controller.deleteReview)

module.exports = router
