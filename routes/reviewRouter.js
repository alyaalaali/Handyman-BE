const router = require("express").Router()
const controller = require("../controllers/reviewController")
const { stripToken, verifyToken } = require('../middleware/index')

router.post("/new", stripToken, verifyToken, controller.createReview)
router.delete("/:id", stripToken, verifyToken ,controller.deleteReview)

module.exports = router
