const express = require('express');
const { 
  getDashboardStats, 
  getUsers, 
  updateUserRole, 
  deleteUser 
} = require('./../controllers/adminController');
const { protect, authorize } = require('./../middleware/auth');
const { adminOnly } = require('./../middleware/admin');

const router = express.Router();

// All routes are protected and admin only
router.use(protect);
router.use(authorize('admin'));
router.use(adminOnly);

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;