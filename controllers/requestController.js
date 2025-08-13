const Request = require("../models/Request")

const CreateRequest = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const { title, description, categories, location } = req.body
    const request = await Request.create({
      ...req.body,
      status: "active",
      appliedBy: [],
      userId: res.locals.payload.id,
    })
    console.log("Request: ", request)
    res.send(request)
  } catch (error) {
    console.log(error)
  }
} //works

const UpdateRequest = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const userId = res.locals.payload.id
    const request = await Request.findOne({ _id: id, userId })
    if (!request) {
      return res.send("Unauthorized to update this request")
    }
    if (updates.status === "closed" && !request.providerId) {
      return res.send("Cannot close request without an accepted provider")
    }

    const updatedRequest = await Request.findByIdAndUpdate(id, updates, {
      new: true,
    })
      .populate("providerId", "name profession contact")
      .populate("appliedBy", "name profession contact")

    res.send(updatedRequest)
  } catch (error) {
    console.log(error)
  }
} // works

const getActiveRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "active",
      userId: res.locals.payload.id,
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })

    res.send(requests)
  } catch (error) {
    console.log(error)
  }
} //works

const getCompletedRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "closed",
      userId: res.locals.payload.id,
    })
      .populate("userId", "name email")
      .populate("providerId", "name")
      .sort({ updatedAt: -1 })
    res.send(requests)
  } catch (error) {
    console.log(error)
  }
} // works

const getSingleRequest = async (req, res) => {
  try {
    const request = await Request.findOne({
      _id: req.params.id,
      userId: res.locals.payload.id,
    })
      .populate("userId", "name email")
      .populate("providerId", "name profession contact")
      .populate("appliedBy", "name profession contact location")
    if (!request) {
      return res.send("Request not found or unauthorized")
    }
    res.send(request)
  } catch (error) {
    console.log(error)
  }
} //  works

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params
    const request = await Request.findOne({
      _id: id,
      userId: res.locals.payload.id,
    })
    if (!request) {
      return res.send("Unauthorized to delete this request")
    }
    await Request.findByIdAndDelete(id)
    res.send("deleted request!")
  } catch (error) {
    console.log(error)
  }
} // works, might need to add security measure for this to deny unauthorized access

const acceptProvider = async (req, res) => {
  const { requestId, providerId } = req.params

  const request = await Request.findOne({
    _id: requestId,
    userId: res.locals.payload.id,
  })

  if (!request) return res.send("Request not found")
  if (request.status !== "active") return res.send("Request is closed")
  if (request.providerId) return res.send("Provider already selected")

  const updatedRequest = await Request.findByIdAndUpdate(
    requestId,
    {
      providerId: providerId,
      appliedBy: [],
    },
    { new: true }
  )
    .populate("providerId", "name profession contact")
    .populate("userId", "name email")

  res.send(updatedRequest)
}

const getApplicants = async (req, res) => {
  const request = await Request.findById(req.params.requestId)
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "appliedBy",
      select: "name profession location",
    })
    .populate({
      path: "providerId",
      select: "name profession location ",
    })

  res.send(request)
}

module.exports = {
  deleteRequest,
  CreateRequest,
  UpdateRequest,
  getCompletedRequests,
  getActiveRequests,
  getSingleRequest,
  acceptProvider,
  getApplicants,
}
