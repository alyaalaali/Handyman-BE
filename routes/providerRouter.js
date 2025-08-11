const express = require('express');
const router = express.Router();
const controller = require('../controllers/providerController');
const middleware = require('../middleware');

// Protected routes (require valid JWT)
router.use(middleware.verifyToken);


router.get('/categories', controller.listCategories);


router.get('/categories/:category/requests', controller.getRequestsByCategory);


router.get('/requests/:id', controller.getRequestDetails);

module.exports = router;