const router = require("express").Router()
const controller = require("../controllers/requestController")

router.post("/new", controller.CreateRequest)
router.put("/:id", controller.UpdateRequest)
router.get("/active", controller.getActiveRequests)
router.get("/completed", controller.getCompletedRequests)
router.get("/:id", controller.getSingleRequest)
module.exports = router
