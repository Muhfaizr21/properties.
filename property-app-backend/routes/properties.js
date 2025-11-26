const express = require('express');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');
// const upload = require('../middleware/upload'); // Comment dulu

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getProperty);

// Protected routes
router.use(protect);
// router.post('/', authorize('admin', 'agent'), upload.array('images', 10), createProperty);
router.post('/', authorize('admin', 'agent'), createProperty); // Tanpa upload dulu
router.put('/:id', authorize('admin', 'agent'), updateProperty);
router.delete('/:id', authorize('admin', 'agent'), deleteProperty);

module.exports = router;