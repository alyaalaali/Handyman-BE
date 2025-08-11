const router = require("express").Router()
const controller = require("../controllers/requestController")
const middleware = require("../middleware/index")

router.post(
  "/new",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRequest
)
router.put("/:id", controller.UpdateRequest)
router.get("/active", controller.getActiveRequests)
router.get("/completed", controller.getCompletedRequests)
router.get("/:id", controller.getSingleRequest)
router.delete("/:id", controller.deleteRequest)



module.exports = router
