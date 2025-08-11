const Request = require('../models/Request');

// 1. List all available categories
const listCategories = async (req, res) => {
  try {
    // Get unique categories from all requests
    const categories = await Request.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// 2. Get requests by category
const getRequestsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const requests = await Request.find({ 
      category,
      status: 'active' // Only show active requests
    })
      .populate('userId', 'name email') // Client info
      .sort({ createdAt: -1 }); // Newest first

    res.json(requests);
  } catch (error) {
    console.error('Category requests error:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// 3. Get single request details
const getRequestDetails = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('userId', 'name email contact') // Client details
      .populate('appliedBy', 'name profession'); // Providers who applied

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    console.error('Request details error:', error);
    res.status(500).json({ error: 'Failed to fetch request' });
  }
};

module.exports = {
  listCategories,
  getRequestsByCategory,
  getRequestDetails
};