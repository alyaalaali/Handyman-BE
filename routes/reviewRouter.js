const router = require("express").Router()
const controller = require("../controllers/reviewController")

router.post("/new", controller.createReview)
router.delete("/:id", controller.deleteReview)

module.exports = router
