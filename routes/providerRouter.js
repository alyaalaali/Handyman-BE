const router = require("express").Router()
const controller = require("../controllers/providerController")
const middleware = require("../middleware/index")

router.get(
  "/categories",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getProviderCategories
)

router.get(
  "/categories/requests",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getRequestsByCategory
)

router.get(
  "/requests/applied",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAppliedRequests
)

router.get(
  "/requests/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getRequestDetails
)

router.post(
  "/requests/:requestId/apply",
  middleware.stripToken,
  middleware.verifyToken,
  controller.applyToRequest
)

router.delete(
  "/requests/:requestId/apply",
  middleware.stripToken,
  middleware.verifyToken,
  controller.withdrawApplication
)
router.get(
  "/profile/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getProviderProfile
)
router.put(
  "/profile/me",
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateProviderProfile
)

router.get(
  "/profile/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.getOtherProviderProfile
)

module.exports = router
