const pool = require('../config/database');

// @desc    Get all properties with filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      category,
      city,
      minPrice,
      maxPrice,
      bedRooms,
      search
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = ['p.status = "active"'];
    let queryParams = [];

    // Build WHERE conditions
    if (type) {
      whereConditions.push('p.type = ?');
      queryParams.push(type);
    }
    if (category) {
      whereConditions.push('p.category = ?');
      queryParams.push(category);
    }
    if (city) {
      whereConditions.push('p.city LIKE ?');
      queryParams.push(`%${city}%`);
    }
    if (minPrice) {
      whereConditions.push('p.price >= ?');
      queryParams.push(minPrice);
    }
    if (maxPrice) {
      whereConditions.push('p.price <= ?');
      queryParams.push(maxPrice);
    }
    if (bedRooms) {
      whereConditions.push('p.bed_rooms = ?');
      queryParams.push(bedRooms);
    }
    if (search) {
      whereConditions.push('(p.title LIKE ? OR p.description LIKE ? OR p.address LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get properties
    const [properties] = await pool.execute(
      `SELECT p.*, u.name as agent_name, u.phone as agent_phone,
              (SELECT image_url FROM property_images WHERE property_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
       FROM properties p
       LEFT JOIN users u ON p.agent_id = u.id
       ${whereClause}
       ORDER BY p.is_featured DESC, p.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), offset]
    );

    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total 
       FROM properties p 
       ${whereClause}`,
      queryParams
    );

    res.json({
      success: true,
      data: properties,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching properties'
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Get property details
    const [properties] = await pool.execute(
      `SELECT p.*, u.name as agent_name, u.email as agent_email, u.phone as agent_phone, u.avatar as agent_avatar
       FROM properties p
       LEFT JOIN users u ON p.agent_id = u.id
       WHERE p.id = ?`,
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Get property images
    const [images] = await pool.execute(
      'SELECT * FROM property_images WHERE property_id = ? ORDER BY is_primary DESC',
      [id]
    );

    // Increment view count
    await pool.execute(
      'UPDATE properties SET views_count = views_count + 1 WHERE id = ?',
      [id]
    );

    const property = {
      ...properties[0],
      images
    };

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching property'
    });
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private/Agent/Admin
exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      type,
      category,
      address,
      city,
      district,
      bed_rooms,
      bath_rooms,
      land_size,
      building_size,
      facilities,
      is_featured = false
    } = req.body;

    // Insert property
    const [result] = await pool.execute(
      `INSERT INTO properties 
       (title, description, price, type, category, address, city, district, 
        bed_rooms, bath_rooms, land_size, building_size, facilities, agent_id, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        price,
        type,
        category,
        address,
        city,
        district,
        bed_rooms,
        bath_rooms,
        land_size,
        building_size,
        JSON.stringify(facilities || []),
        req.user.id,
        is_featured
      ]
    );

    // Handle image uploads if any
    if (req.files && req.files.length > 0) {
      const imageValues = req.files.map((file, index) => [
        result.insertId,
        `/uploads/${file.filename}`,
        index === 0 // First image as primary
      ]);

      await pool.execute(
        'INSERT INTO property_images (property_id, image_url, is_primary) VALUES ?',
        [imageValues]
      );
    }

    const [properties] = await pool.execute(
      'SELECT * FROM properties WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: properties[0]
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating property'
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private/Agent/Admin
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Check if property exists and user has permission
    const [properties] = await pool.execute(
      'SELECT * FROM properties WHERE id = ?',
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const property = properties[0];

    // Check if user is owner or admin
    if (property.agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    // Build update query
    const allowedFields = [
      'title', 'description', 'price', 'type', 'category', 'address', 'city',
      'district', 'bed_rooms', 'bath_rooms', 'land_size', 'building_size',
      'facilities', 'status', 'is_featured'
    ];

    const setClause = [];
    const values = [];

    allowedFields.forEach(field => {
      if (updateFields[field] !== undefined) {
        setClause.push(`${field} = ?`);
        values.push(field === 'facilities' ? JSON.stringify(updateFields[field]) : updateFields[field]);
      }
    });

    if (setClause.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    values.push(id);

    await pool.execute(
      `UPDATE properties SET ${setClause.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    const [updatedProperties] = await pool.execute(
      'SELECT * FROM properties WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperties[0]
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating property'
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private/Agent/Admin
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property exists and user has permission
    const [properties] = await pool.execute(
      'SELECT * FROM properties WHERE id = ?',
      [id]
    );

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const property = properties[0];

    // Check if user is owner or admin
    if (property.agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await pool.execute('DELETE FROM properties WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting property'
    });
  }
};