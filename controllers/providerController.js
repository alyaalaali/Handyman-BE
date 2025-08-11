const Request = require("../models/Request")
const Provider = require("../models/Provider")

const getProviderCategories = async (req, res) => {
  try {
    const providerId = res.locals.payload.id
    const provider = await Provider.findById(providerId)

    if (!provider) {
      return res.status(404).send({ message: "Provider not found" })
    }

    res.send(provider.categories)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Error fetching provider categories" })
  }
}

const getRequestsByCategory = async (req, res) => {
  try {
    const providerId = res.locals.payload.id
    const category = req.query.category

    if (!category) {
      return res
        .status(400)
        .send({ message: "Category query parameter is required" })
    }

    const provider = await Provider.findById(providerId)
    if (!provider) {
      return res.status(404).send({ message: "Provider not found" })
    }

    // Check if provider actually has this category
    if (!provider.categories.includes(category)) {
      return res.status(403).send({ message: "Unauthorized for this category" })
    }

    // Find active requests in this category
    const requests = await Request.find({
      status: "active",
      category: category,
    })
      .populate("userId", "email")
      .sort({ createdAt: -1 })

    res.send(requests)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Error fetching requests for category" })
  }
}

const getRequestDetails = async (req, res) => {
  try {
    const { id } = req.params

    const request = await Request.findById(id).populate("userId", "email")

    if (!request) {
      return res.status(404).send({ message: "Request not found" })
    }

    res.send(request)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Error fetching request details" })
  }
}

const applyToRequest = async (req, res) => {
  try {
    const providerId = res.locals.payload.id
    const { requestId } = req.params

    const request = await Request.findById(requestId)

    if (!request) {
      return res.status(404).send({ message: "Request not found" })
    }

    if (request.status !== "active") {
      return res.send({ message: "request is closed" })
    }
    if (request.providerId) {
      return res.send({ message: "a provider was already selected" })
    }
    // Prevent duplicate applications
    if (request.appliedBy.includes(providerId)) {
      return res
        .status(400)
        .send({ message: "Already applied to this request" })
    }

    request.appliedBy.push(providerId)
    await request.save()

    res.send({ message: "Applied successfully", request })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Error applying to request" })
  }
}

const withdrawApplication = async (req, res) => {
  try {
    const providerId = res.locals.payload.id
    const { requestId } = req.params

    const request = await Request.findById(requestId)

    if (!request) {
      return res.status(404).send({ message: "Request not found" })
    }

    // Check if provider has applied
    if (!request.appliedBy.includes(providerId)) {
      return res
        .status(400)
        .send({ message: "You have not applied to this request" })
    }

    // Remove provider from appliedBy array
    request.appliedBy = request.appliedBy.filter(
      (id) => id.toString() !== providerId
    )

    await request.save()

    res.send({ message: "Application withdrawn successfully", request })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Error withdrawing application" })
  }
}

const getAppliedRequests = async (req, res) => {
  const providerId = res.locals.payload.id
  const requests = await Request.find({
    appliedBy: providerId,
    status: "active",
  })
    .populate("userId", "name email location")
    .populate("providerId", "name")
    .sort({ updatedAt: -1 })

  res.send(requests)
}

const getProviderProfile = async (req, res) => {
  const providerId = res.locals.payload.id
  const provider = await Provider.findById(providerId).select(
    "name email location contact profession categories type"
  )
  res.send(provider)
}

const updateProviderProfile = async (req, res) => {
  const providerId = res.locals.payload.id
  const { name, location, contact, profession, categories } = req.body

  const updatedProvider = await Provider.findByIdAndUpdate(
    providerId,
    { name, location, contact, profession, categories },
    { new: true }
  ).select("name, location, contact, profession, categories")

  res.send(updatedProvider)
}

const getOtherProviderProfile = async (req, res) => {
  const provider = await Provider.findById(req.params.id).select(
    "name profession categories location"
  )
  res.send(provider)
}

module.exports = {
  getProviderCategories,
  getRequestsByCategory,
  getRequestDetails,
  applyToRequest,
  withdrawApplication,
  getAppliedRequests,
  getProviderProfile,
  updateProviderProfile,
  getOtherProviderProfile,
}
