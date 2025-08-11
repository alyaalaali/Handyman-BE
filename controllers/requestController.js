const Request = require("../models/Request")

const CreateRequest = async (req, res) => {
  try {
    const request = await Request.create({
      ...req.body,
      status: "active",
      appliedBy: [],
    })
    res.send(request)
  } catch (error) {
    console.log(error)
  }
} //works

const UpdateRequest = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const request = await Request.findOne({ _id: id, userId: req.user.id })
    if (!request) {
      return res.send("You are not authorized to update this request")
    }

    const updatedRequest = await Request.findByIdAndUpdate(id, updates, {
      new: true,
    })

    res.send(updatedRequest)
  } catch (error) {
    console.log(error)
  }
} // works

const getActiveRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      status: "active",
      userId: req.user.id,
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
      userId: req.user.id,
    })
      .populate("userId", "name email")
      .populate("providerId", "firstName")
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
      userId: req.user.id,
    }).populate("userId", "name email")
    if (!request) {
      return res.send("Request not found or not authorized")
    }

    res.send(request)
  } catch (error) {
    console.log(error)
  }
} //  works

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params
    const request = await Request.findOne({ _id: id, userId: req.user.id })
    if (!request) {
      return res.send("Not authorized to delete this request")
    }
    await Request.findByIdAndDelete(id)
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
