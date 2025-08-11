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
    const request = await Request.findOne({
      _id: req.params.id,
      userId: res.locals.payload.id,
    }).populate("userId", "firstName email")
    // .populate("providerId", "firstName email")
    // .populate("appliedBy", "firstName email")
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




module.exports = {
  deleteRequest,
  CreateRequest,
  UpdateRequest,
  getCompletedRequests,
  getActiveRequests,
  getSingleRequest,
  
}
