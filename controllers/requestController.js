const Request = require("../models/Request")

const CreateRequest = async (req, res) => {
  try {
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

    const request = await Request.findByIdAndUpdate(id, updates)
    const updatedRequest = await Request.findById(id)

    res.send(updatedRequest)
  } catch (error) {
    console.log(error)
  }
} // works

const getActiveRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "active" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })

    res.send(requests)
  } catch (error) {
    console.log(error)
  }
} //works

const getCompletedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "closed" })
      .populate("userId", "firstName email")
      .populate("providerId", "firstName")
      .sort({ updatedAt: -1 })
    res.send(requests)
  } catch (error) {
    console.log(error)
  }
} // works

const getSingleRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate(
      "userId",
      "firstName email"
    )
    // .populate("providerId", "firstName email")
    // .populate("appliedBy", "firstName email")
    res.send(request)
  } catch (error) {
    console.log(error)
  }
} //  works

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params
    const request = await Request.findByIdAndDelete(id)

    res.send("deleted request!")
  } catch (error) {
    console.log(error)
  }
} // works, might need to add security measure for this to deny unauthorized access

module.exports = {
  deleteRequest,
  CreateRequest,
  UpdateRequest,
  getCompletedRequests,
  getActiveRequests,
  getSingleRequest,
}
