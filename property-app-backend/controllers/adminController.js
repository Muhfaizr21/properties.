const pool = require('../config/database');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total properties
    const [propertiesResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM properties'
    );
    
    // Get total users
    const [usersResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM users'
    );
    
    // Get total agents
    const [agentsResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM users WHERE role = "agent"'
    );
    
    // Get total inquiries
    const [inquiriesResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM inquiries'
    );
    
    // Get recent properties
    const [recentProperties] = await pool.execute(
      `SELECT p.*, u.name as agent_name 
       FROM properties p 
       LEFT JOIN users u ON p.agent_id = u.id 
       ORDER BY p.created_at DESC 
       LIMIT 5`
    );
    
    // Get recent inquiries
    const [recentInquiries] = await pool.execute(
      `SELECT i.*, p.title as property_title, u.name as user_name 
       FROM inquiries i 
       LEFT JOIN properties p ON i.property_id = p.id 
       LEFT JOIN users u ON i.user_id = u.id 
       ORDER BY i.created_at DESC 
       LIMIT 5`
    );

    const stats = {
      totalProperties: propertiesResult[0].total,
      totalUsers: usersResult[0].total,
      totalAgents: agentsResult[0].total,
      totalInquiries: inquiriesResult[0].total,
      recentProperties,
      recentInquiries
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats'
    });
  }
};

// @desc    Get all users with pagination
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get users with pagination
    const [users] = await pool.execute(
      `SELECT id, name, email, phone, role, is_verified, created_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    // Get total count
    const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM users');

    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['admin', 'agent', 'user'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    await pool.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, id]
    );

    res.json({
      success: true,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user role'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
};