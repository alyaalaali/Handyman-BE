const Request = require('../models/Request')
const Provider = require('../models/Provider')


const getProviderCategories = async (req, res) => {
  try {
    const providerId = res.locals.payload.id
    const provider = await Provider.findById(providerId)

    if (!provider) {
      return res.status(404).send({ message: 'Provider not found' })
    }

    res.send(provider.categories) 
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error fetching provider categories' })
  }
}


const getRequestsByCategory = async (req, res) => {
  try {
    const providerId = res.locals.payload.id
    const category = req.query.category

    if (!category) {
      return res.status(400).send({ message: 'Category query parameter is required' })
    }

    const provider = await Provider.findById(providerId)
    if (!provider) {
      return res.status(404).send({ message: 'Provider not found' })
    }

    // Check if provider actually has this category
    if (!provider.categories.includes(category)) {
      return res.status(403).send({ message: 'Unauthorized for this category' })
    }

    // Find active requests in this category
    const requests = await Request.find({
      status: 'active',
      categories: category
    })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.send(requests)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error fetching requests for category' })
  }
}



