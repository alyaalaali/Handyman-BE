const router = require("express").Router()
const controller = require("../controllers/requestController")
const middleware = require("../middleware/index")

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRequest
)
router.put(
  "/:requestId/accept/:providerId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.acceptProvider
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
  "/:requestId/applicants",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getApplicants
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
