const router = require("express").Router()
const controller = require("../controllers/requestController")
const middleware = require("../middleware/index")

router.post(
  "/new",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRequest
)
router.put(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateRequest
)
router.get(
  "/active",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getActiveRequests
)
router.get(
  "/completed",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getCompletedRequests
)
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getSingleRequest
)
router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteRequest
)

module.exports = router
